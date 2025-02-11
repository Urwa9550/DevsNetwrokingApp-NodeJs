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

 const express = require('express');
 const app = express();

//this is our request handler
 app.use("/test",(req, res)=>{
res.send("Hello from the server!")
 })

 app.use("/hello",(req, res)=>{
res.send("Hello helloo helloo from the server!")
 })

 app.listen(3000, ()=>{
    console.log("Server is succeessfully listening on port 3000")
 }); // now our app has start listening on port 3000
 
/**
 * when we browse localhost:3000, it means we are making a request to the server and our request will be listened by request handler and then it will send response 
 */