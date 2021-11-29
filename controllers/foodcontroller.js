const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { EateryModel } = require("../models");


/*Eatery Review Create*/
router.post("/create", validateJWT, async (req, res) => {
    const { eateryName, review, cost, rating } = req.body.eatery;
    const eateryEntry = {
      eateryName,
      review,
      cost,
      rating,
      userId: req.user.id
    }
    try {
      const newEateryEntry = await EateryModel.create(eateryEntry);
      res.status(200).json(newEateryEntry);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });


  /*Get All Eatery Reviews *//* Only need this for 2.0 */
// router.get('/', async (req, res) => {
//   try {
//     const entries = await EateryModel.findAll();
//     res.status(200).json(entries);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });


/*Get Eatery Reviews by user */
router.get("/:id", validateJWT, async (req, res) => {
  try{
    const userEateryReviews = await EateryModel.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.status(200).json(userEateryReviews);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


/*Update Eatery Reviews */
router.put("/update/:id", validateJWT, async (req, res) => {
  const { eateryName, review, cost, rating} = req.body.eatery
  try {
    const updatedEateryReview = await EateryModel.update({ eateryName, review, cost, rating },
      {where: {
        id: req.params.id,
        userId: req.user.id  
      }})
      res.status(200).json({ message: "updated successfully", updatedEateryReview})
  } catch (err){
    res.status(500).json({ message: "update failed", updatedEateryReview})
  };
});


/*Delete a eatery review */
router.delete("/delete/:id", validateJWT, async (req, res) => {
  try{
    const query = {
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    }
    await EateryModel.destroy(query)
    res.status(200).json({
      message: "deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "delete failed"
    })
  }
})

  module.exports = router;