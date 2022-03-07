const express = require('express');
const router = express.Router();
// const {Package} =require('../models');
const db = require('../models');

router.get('/', async(req, res, next ) => {
  try{
    const packages = await db.Package.find({});
    const context = { packages }
    return res.render('index.ejs', context);
  }catch (error){
    console.log(error);
    req.error = error;
    return next();
  }
});


router.post('/', async(req, res, next ) =>{
  try{
    const createPackage = await db.Package.create(req.body)
    console.log(createPackage);
    
    res.redirect("/packages");
  }catch (error){
    console.log(error);
    req.error = error;
    return next();
  }
  })
  
  router.get('/new', (req, res)=>{
    res.render('new.ejs');
  });
  
  router.get('/:packageId', async (req, res, next) => {
    try {
      const foundPackage = await db.Package.findById(req.params.packageId)
      console.log(foundPackage);
      context = {package_id: foundPackage}
      res.redirect('show.ejs', context)
  }catch (error){
    console.log(error);
    req.error = error;
    return next();
  }   
});
  
  router.delete('/:packageId', async (req, res, next) => {
    try {
      const deletePackage = await DelayNode.Package.findByIdAndDelete(req.params.packageId);
      console.log(deletePackage);

      res.redirect('/packages')
    }catch (error){
    console.log(error);
    req.error = error;
    return next();
  }   
});
  
  router.get('/:packageId/edit',  async (req, res, next) => {
    try {
      const updatedPackage = await db.Package.findById(req.params.packageId);

      console.log(updatedPackage);
      return res.render('edit.ejs', { package: updatedPackage })
  } catch (error) {
      console.log(error);
      req.error = error;
      return next();
  }
})
  
  router.put('/:packageId',  async (req, res, next) => {

    try {
        const updatedPackage = await db.Package.findByIdAndUpdate(req.params.packageId, req.body);

        console.log(updatedPackage);
        return res.redirect('/packages');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

  
  module.exports = router;