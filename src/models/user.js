const mongoose = require("mongoose");
var validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3, // for String use 'minLength' & for a Number user 'min'
    },
    lastName: {
        type: String,
        default: "",
        trim: true,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email: "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password ");
            }
        }
    },
    age: {
        type: Number,
        default: null,
    },
    gender: {
        type: String,
        // default: "Others",
        validate(value){
            //it will work only if new document is added, it will not work when a value gets update, cz when updating a document by default the value of runValidators is off, so go to your patch request and put there runValidators to true. 
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
        },
    photoUrl: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/7790161?v=4",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url: "+ value);
            }
        }
    },
    about: {
        type: String,
        default: "This is default about of the user!",
    },
    skills: {
        type: [String],
        default: [],
    },
},
{
    // because of "timestamps" key, "createdAt" & "updatedAt" auto created in the user object  
    timestamps: true,
});

// whenever u r referencing to a model the name always start with capital letter 
const User = mongoose.model("User", userSchema);

module.exports = User;