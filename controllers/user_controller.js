const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt =  require("jsonwebtoken");
const { user } = require(".");

const auth = require("../middleware/auth");
const { User } = require("../models/index");

// JWT is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server

router.get('/',  async (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.get('/', async (req, res) => {
// User.findById(req.user)
//     .then(users => res.json({
//         id: user._id,
//         username: user.usename
//     }))

router.post('/signup', async (req, res) => {
    try{
        const { username, email, password, passwordConfi } = req.body;
        if(!(username || email || password)){
            res.status(400).json("Please fill out all fields")
        }
        if (password.length < 6) {
            return res.status(400).json( "Password must be at least 6 characters");
        }
        // if (password !== passwordConfi) {
        //     return res.status(400).json("Passwords do not match");
        // }

        const userExist = await User.findOne({email});
        if(userExist){
            res.status(409).json("User aleardy exist")
        }

        const newUser = new User({
            username,
            email,
            password,
            image,
        });
      
         const userAdded = await newUser.save()
        res.json(userAdded)
    } catch{
         res.status(400).json("Sign up error");
    }
});



router.post("/login", async (req, res) => {
    try{

        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).json("Please fill out all fields");
        }

        const user = await User.findOne({email: email});
        const isMatch = await bcrypt.compare(password, user.password);
        
        if( user && isMatch){
            const token = jwt.sign(
                { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                 }
            );
            // save user token
            user.token = token;
            // user
            // req.session.currentUser = {
            //     id: foundUser._id,
            //     username: foundUser.username,
            // };
        
        // , sessUser
            return res.status(200).json(" Logged In Successfully");
        }

    } catch (error) {
    res.status(404).json("Invalid Credentials");
  }
});


router.get("/logout", async (req, res) => {
    try {
        
        await req.session.destroy();
        //  res.clearCookie("session-id");
        res.send("you logged out")

    } catch (error) {
        res.status(404).json(error);
    }
});

router.put("/:id", async (req, res) => {
  try {
   
    res.json(
      await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res)=>{
   try {
    
    res.json(await User.findByIdAndRemove(req.params.id));
  } catch (error) {

    res.status(400).json(error);
  }
});

module.exports = router;