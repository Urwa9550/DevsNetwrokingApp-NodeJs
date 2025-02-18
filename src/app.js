/**
 app.js is the starting point of the application 
 main core js file where we will write the nodejs code 
 **/ 

 /**
  * first we need to create backend
  * for this we need to create server
  * so that we can listen to the request of other users ( from outside world )
  * to create a server here we will be using  expressjs
  * to create a new server we will have to call listen() to listen to a port
  */
 const connectDB = require("./config/database")
 const User = require("./models/user")

 const express = require('express');
 const app = express();

 const {adminAuth} = require('./middlewares/auth');

 // create a user - post - "/signup"
 app.post("/signup", async (req, res)=> {
   const user = new User({
      firstName: "Urwa",
      lastName: "Ali",
      emailId: "urwa0@gmail.com",
      password: "test1122",
   });
try {
   await user.save();
   res.send({success: true, message: "User added successfully."})
} catch (error) {
   res.status(400).send({success: false, message: ''+ error})
}
 })

 connectDB().then(()=> {
   console.log("Database connection established...")

   app.listen(3000, ()=>{
      console.log("Server is succeessfully listening on port 3000")
   }); // now our app has start listening on port 3000

}).catch(err=> {
   console.error("Database connection Failed")
})
 
 
/**
 * when we browse localhost:3000, it means we are making a request to the server and our request will be listened by request handler and then it will send response 
 */