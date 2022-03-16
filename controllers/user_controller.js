// const bcrypt = require("bcrypt");
// const { verify } = require("jsonwebtoken");
const router = require("express").Router();
// const jwt =  require("jsonwebtoken");

// const auth = require("../middleware/auth");
const { User } = require("../models/index");

// JWT is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server

router.get('/',  async (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/signup', async (req, res) => {
    try{
        const { username, email, password } = req.body;
        if(!(username || email || password)){
            res.status(400).send("Please fill out all fields")
        }
        if (password.length < 6) {
            return res.status(400).send( "Password must be at least 6 characters");
        }
        // if (password !== passwordConfi) {
        //     return res.status(400).send("Passwords do not match");
        // }
        console.log(req.body);

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(409).send("User aleardy exist")
        }

        const newUser = new User({
            username,
            email,
            password,
            // image,
        });
        console.log(newUser);
         const userAdded = await newUser.save()

        return res.send(userAdded)
    } catch(err){
        console.log(err.message)
         return res.status(400).send("Sign up error");
    }
});



router.get("/login", async (req, res) => {
    try{

        const { email, password } = req.body;

        console.log(req.body);
        if(!email || !password){
            return res.status(400).json("Please fill out all fields");
        }

        const user = await User.findOne({email: email});
        const isMatch = await bcrypt.compare(password, user.password);
        
        if( user && isMatch){
            // const token = jwt.sign(
            //     { user_id: user._id, email },
            //         process.env.TOKEN_KEY,
            //     {
            //         expiresIn: "5h",
            //      }
            // );
            // // save user token
            // user.token = token;
            // user
            // req.session.currentUser = {
            //     id: foundUser._id,
            //     username: foundUser.username,
            // };
        
        // , sessUser
            return res.status(200).json(" Logged In Successfully");
        }

    } catch(err){
        console.log(err.message)
    return res.status(404).json("Invalid Credentials");
  }
});


// ?need to verify my route is not working

router.get("/logout", async (req, res) => {
    try {
        
        await req.session.destroy();
        //  res.clearCookie("session-id");
        res.json("you logged out")

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

router.get("/:id", async (req, res) => {
  try {
    res.json(await User.findById({ "_id": req.params.id }));
  } catch (err) {
    res.status(400).json(error);
  }
});

module.exports = router;