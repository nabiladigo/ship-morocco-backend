const express = require("express");
const { regisgterUser, authUser } = require("../controllers");
const router = express.Router();


router.route("/").post(regisgterUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect,updateUserProfile)


module.exports =router;