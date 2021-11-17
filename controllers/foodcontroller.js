const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { EateryModel } = require("../models");

router.post("/create", validateJWT, async (req, res) => {
    const { name, review, cost, rating } = req.body.eatery;
    const { id } = req.user;
    const eateryEntry = {
      name,
      review,
      cost,
      rating,
      // owner: id
    }
    try {
      const newEateryEntry = await EateryModel.create(eateryEntry);
      res.status(200).json(newEateryEntry);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });



  module.exports = router;