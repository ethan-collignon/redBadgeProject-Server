const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*Register a new User*/
router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body.user;
  try {
    const User = await UserModel.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered",
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user",
      });
    }
  }
});

/*Login a user */
router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;
  try {
    let loginUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );
      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({
          user: loginUser,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to log user in",
    });
  }
});

/*Get all users */ /*Needs locked behind admin */
router.get("/", async (req, res) => {
  try {
    let User = await UserModel.findAll();
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*Delete users*/ /*Needs locked behind admin*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const query = {
      where: {
        id: req.params.id
      },
    };
    await UserModel.destroy(query);
    res.status(200).json({
      message: "User has successfully been deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error: User has not been deleted",
    });
  }
});

module.exports = router;
