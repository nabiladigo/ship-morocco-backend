const bcrypt = require("bcryptjs");
const express = require("express");
const { User } = require("../models/index");

// JWT is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server
const router = express.Router();

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

router.post('/register', (req, res) => {

    const { username, email, password, image } = req.body;

    const newUser = new User({
        username,
        email,
        password,
        image,
    });
    newUser.save()
    .then(() => res.json('user added!'))
    .catch(err => res.status(400).json('Error: ' +err));
});


router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).json("Please fill out all fields");
        }
        const user = await User.findOne({email: email});
        if (!user){
            res.status(400).json("Account does not exist")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json("Invalid login");
        }
        // const sessUser = { id: user.id, username: user.username, email: user.email };
        // req.session.user = sessUser;
        res.json({ msg: " Logged In Successfully"
        // , sessUser
     });

    } catch (error) {
    res.status(404).json(error);
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