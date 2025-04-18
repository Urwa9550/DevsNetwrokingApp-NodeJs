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
 const bcrypt = require('bcrypt')

 const express = require('express');
 const app = express();

 const {adminAuth} = require('./middlewares/auth');
 const { validateSignupData } = require("./utils/validation");
 app.use(express.json()) // now my middleware is activated for all the routes (rh)
 // create a user - post - "/signup"
 app.post("/signup", async (req, res)=> {
   /**
    * if send raw data via Post body ( in json format ) it will give undefined on the server 
    * why it gives undefined, cz the data is in json format and our server is not able to read that json data
    * to read that json data we will need help of a middleware ( we need to use it for all of our apis ) 
    * 
    * Middleware can read that json, convert it into the javascript object, put it into the body and give us access to that data 
    * over here : req.body
    * 
    * there is a middleware given to us by express i.e express.json
    * app.use(express.json()) // now my middleware is activated for all the routes (rh)
    */

   try {
      //  ----- validation of data -----
   validateSignupData(req);
   // ----- Encrypt the password ----
   /**
    * to encrypt the pasword there is an npm package we will use named 'bcrypt'
    */
   const { firstName, lastName, emailId, password, gender } = req.body;
   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash);

   // creating a new instance of user model - dynamic api way 
   console.log(req.body.firstName);
   // const user = new User(req.body);
   // creating a new instance of user model - hardcore api way 
   // const user = new User({        
   //    firstName: "Uzma",
   //    lastName: "Alam",
   //    emailId: "uzma0@gmail.com",
   //    password: "test1122",
   // });
   const user = new User({        
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
   });

   const name = req.body.firstName;
   await user.save();
   res.send({success: true, message: "User added successfully.",
       firstName: name
      })
} catch (error) {
   console.log(error);
   res.status(400).send({success: false, message: ''+ error.message})
}
 });

 app.post("/login", async (req, res)=>{
   try{
      const {emailId, password } = req.body;
      if(validator.isEmail(emailId)){
         return
      }

      const user = await User.findOne({ emailId : emailId})
      if (!user){
         res.status(404).send({error: true, message: "User not found."})

      }

      // first check if the user trying to login exists in our database 

      // const isPasswordValid = await bcrypt.compare("Test@123", "$2b$10$tEjn0ni9tuqKdP91z0u0fOd8kJAU9BvJfemI0DVoC92I7TRJQPOZu");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if ( isPasswordValid ) {

      } else{
         throw new Error("Password id not correct.")
      }
      
      
   }catch ( error){
      
      res.status(400).send({success: false, message: ''+ error})
   }

 });

// get user by email
// app.get("/user", async (req,res)=> {}))
app.get("/userbyemail", async (req,res)=> {
   const userEmail = req.body.emailId;
try {
   const users = await User.find({ emailId: userEmail });
   if( users.length === 0){
      
      res.status(400).send({success: false, message: 'User not found.'});
   }
   
   // --- output response ---
   res.send(users);
   
} catch (error) {
   res.status(400).send({success: false, message: ''+ error});
}

});

// get One user by email
// app.get("/user", async (req,res)=> {}))
app.get("/oneuserbyemail", async (req,res)=> {
   const userEmail = req.body.emailId;
try {
   const users = await User.findOne({ emailId: userEmail });
   if(!users){
      
      res.status(404).send({success: false, message: 'User not found.'});
   }else{

      res.send(users);
   }
   
   
} catch (error) {
   res.status(400).send({success: false, message: ''+ error});
}

});


// feed api - GET /feed - get all the users from the database
 app.get("/feed", async (req, res)=> {
try {
   const users = await User.find({}); // it will get u all the documents from your collection

   res.send(users);
} catch (error) {
   res.status(400).send({success: false, message: ''+ error});

}
 });

// Read PATCH from the mongoose document
 // patch user api - PATCH /user - update a user in the database
//---- fetch userID from request body---- 
//  app.patch("/user", async (req, res)=> {
   //    const userId = req.body.userId;
   //---- fetch userID from params ---- 
 app.patch("/user/:userId", async (req, res)=> {
   const userId = req.params?.userId;
   // const user = new User(req.body);
   const user = req.body;
   console.log(req.body)

   const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", "lastName", "skills"
   ]

   // requestbody raw { userId: "jjsdhjsdhjsdhjsd1w3233"}

   try {
      const isUpdateAllowed = Object.keys(user).every((k)=>{
         ALLOWED_UPDATES.includes(MediaKeyMessageEvent)
      })
   
      if(!isUpdateAllowed){

         throw new Error("Update not allowed in keys.")
         // res.status(400).send({success: false, message: "Update not allowed."})
      }
      
      if(user?.skills.length > 10){
         throw new Error("SKills length must not exceed 10");

      }
      // const usersDel = await User.findByIdAndDelete({_id: userId}); // it will get u all the documents from your collection ( it works )
      // const userUpdated = await User.findByIdAndUpdate({_id: userId}, user); // it will get u all the documents from your collection ( it works as well )
      // const userUpdatedBefore = await User.findByIdAndUpdate( userId, user); // it will get u all the documents from your collection ( it works as well )
      const userUpdatedAfter = await User.findByIdAndUpdate( userId, user, {returnDocument: 'after', runValidators: true}); // it will get u all the documents from your collection also the changed document ( it works as well )
      if(!userUpdatedAfter){
         res.status(404).send({success: false, message: 'User not found.'});
      }else{
      res.send({success: true, message: "User updated.", user: userUpdatedAfter });
      }
   } catch (error) {
      res.status(400).send({success: false, message: 'Update Failed: '+ error});
   
   }
    });

 // delete user api - DELETE /user - delete a user from the database
 app.delete("/user", async (req, res)=> {
   const userId = req.body.userId;

   // requestbody raw { userId: "jjsdhjsdhjsdhjsd1w3233"}

   try {
      // const usersDel = await User.findByIdAndDelete({_id: userId}); // it will get u all the documents from your collection ( it works )
      const usersDel = await User.findByIdAndDelete(userId); // it will get u all the documents from your collection ( it works as well )
   
      res.send({success: true, message: "User deleted."});
   } catch (error) {
      res.status(400).send({success: false, message: ''+ error});
   
   }
    });

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