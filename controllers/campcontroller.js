const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const models = require("../models");
const { CampsiteModel } = require("../models");


/*Campsite Review Create*/
router.post("/create", validateJWT, async (req, res) => {
  const { siteName, review, cost, rating,} = req.body.campsite;
  const campsiteEntry = {
    siteName,
    review,
    cost,
    rating,
    userId: req.user.id
  }
  try {
    const newCampsiteEntry = await CampsiteModel.create(campsiteEntry);
    res.status(200).json(newCampsiteEntry);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


/*Get All Camp Reviews *//* Only need this for 2.0 */
// router.get('/', async (req, res) => {
//   try {
//     const entries = await CampsiteModel.findAll();
//     res.status(200).json(entries);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });


/*Get Camp Reviews by user */
router.get("/:id", validateJWT, async (req, res) => {
  try{
    const userCampReviews = await CampsiteModel.findAll({
      where: {
        userId: req.user.id
        // owner_id: req.user.id
      }
    });
    res.status(200).json(userCampReviews);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


/*Update Campsite Reviews */
router.put("/update/:id", validateJWT, async (req, res) => {
  const { siteName, review, cost, rating} = req.body.campsite
  try {
    const updatedCampsiteReview = await CampsiteModel.update({ siteName, review, cost, rating },
      {where: {
        id: req.params.id,
        userId: req.user.id
      }})
      res.status(200).json({ message: "updated successfully", updatedCampsiteReview})
  } catch (err){
    res.status(500).json({ message: "update failed", updatedCampsiteReview})
  };
});


/*Delete a campsite review */
router.delete("/delete/:id", validateJWT, async (req, res) => {
  try{
    const query = {
      where: {
        id: req.params.id, 
        userId: req.user.id
      }
    }
    await CampsiteModel.destroy(query)
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
