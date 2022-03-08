const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please Provide An Email Address."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please Provide A Password"],
        },
        username: { 
            type: String, 
            required: true, 
            unique: true,
            minlength: 3 
        },
    },
    {
     timestamps :true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;