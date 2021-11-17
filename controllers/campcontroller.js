const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { CampsiteModel } = require("../models");

// router.get("/practice", validateJWT, (req, res) => {
//   res.send("Hey!! This is a practice route!");
// });

/*Campsite Review Create*/
router.post("/create", validateJWT, async (req, res) => {
  const { siteName, review, cost, rating } = req.body.campsite;
  const { id } = req.user;
  const campsiteEntry = {
    siteName,
    review,
    cost,
    rating,
    owner: id
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
  let { id } = req.params;
  try{
    const userCampReviews = await CampsiteModel.findAll({
      where: {
        id: id
      }
    });
    res.status(200).json(userCampReviews);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});






/*Update Campsite Reviews *//!Not working!/
router.put("/update/:entryId", validateJWT, async (req, res) => {
  const {siteName, review, cost, rating} = req.body.campsite;
  const campsiteReviewId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: campsiteReviewId,
      owner: userId
    }
  };

  const updatedCampsiteReview = {
    siteName: siteName,
    review: review,
    cost: cost,
    rating: rating,
  };

  try {
    const update = await CampsiteModel.update(updatedCampsiteReview, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// router.put("/update/:id", async (req, res) => {
//   const { siteName, review, cost, rating} = req.body.campsite
//   try {
//     const updatedCampsiteReview = await CampsiteModel.updatedCampsiteReview({ siteName, review, cost, rating },
//       {where: {id: req.params.id}})
//       res.status(200).json({ message: "updated successfully", updatedCampsiteReview})
//   } catch (err){
//     res.status(500).json({ message: "update failed", updatedCampsiteReview})
//   };
// });













/*Delete a campsite review */
// router.delete("/delete/:id", validateJWT, async (req, res) => {
//   const ownerId = req.user.id;
//   const campsiteReviewId = req.params.id;

//   try {
//     const query = {
//       where: {
//         id: campsiteReviewId,
//         owner: ownerId
//       }
//     };
//     await CampsiteModel.destroy(query);
//     res.status(200).json({ message: "Campsite Review Removed"});
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// })

router.delete("/delete/:id", async (req, res) => {
  try{
    const query = {
      where: {
        id: req.params.id
      }
    }
    await CampsiteModel.destroy(query)
    res.status(200).json({
      message: "deleted"
    });
  } catch (err) {
    res.status(500).json({
      message: "not deleted"
    })
  }
})

module.exports = router;
