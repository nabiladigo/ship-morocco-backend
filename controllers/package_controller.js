const express = require('express');
const router = express.Router();

const {Package} = require('../models');



router.get("/", async (req, res) => {
  try {

    res.json(await Package.find({}));
  } catch (error) {
   
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {

    res.json(await Package.create(req.body));
  } catch (error) {

    res.status(400).json(error);
  }
});

// router.get("/new", function(req, res) {
//     res.json()
// })

router.put("/edit/:id", async (req, res) => {
  try {
    const { image, price, title, weight } = req.body;
    const package = await Package.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    const editedPackage = package.save();

    return res.status(200).json(editedPackage);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    
    res.json(await Package.findByIdAndRemove(req.params.id));
  } catch (error) {

    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await Package.findOne({ "_id": req.params.id }));
  } catch (err) {
    res.status(400).json(err);
  }
});




  
  module.exports = router;