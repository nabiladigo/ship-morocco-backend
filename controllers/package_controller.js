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

router.put("/:id", async (req, res) => {
  try {
   
    res.json(
      await Package.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
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
    res.status(400).json(error);
  }
});




  
  module.exports = router;