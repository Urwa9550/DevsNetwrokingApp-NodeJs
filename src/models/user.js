const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// whenever u r referencing to a model the name always start with capital letter 
const User = mongoose.model("User", userSchema);

module.exports = User;