const asyncHandler = require("express-async-handler")
const { User } = require("../models");
// const generateToken = require("../utils/generatToken.js") thin need to be add in the folders


// Auth the user and login

const authUser = asyncHandler(async(req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // token: generateToken(user._id),
    });
    }else{
        res.status(401)
        // 401 unauthorized   
         throw new Error("Invalid Email or Password");
    }
});

// register new user

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, image } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    // need to be redirected to login
    res.status(400).json("User already exists");
    // throw new Error("User already exists");
    // res.json("/login")
  }

  const newUser = await User.create(req.body);

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      image: newUser.image,
    //   token: generateToken(user._id),
    });
    // res.status(201).json("user added!")
    // need to be redirected to login

  } else {
    res.status(400).json("User not found");
    // throw new Error("User not found");
  }
});