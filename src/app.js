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

 const {adminAuth} = require('./middlewares/auth');

// app.use('/admin', adminAuth);
// app.get('/admin/getAllData', (req, res)=>{
// res.send("Get All data");
// });

app.get('/getAllData', (req, res)=>{
    // logic of DB call and get user data 
res.send("Get All data");
});

// app.post('/user/login', (req, res)=>{
//     res.send("User logged in successfully");
//     });

 // advance routing techniques -> ( _?, _+, _*_ )it will work for request /ac as well as /abc ( Now 'b' is optional over here)
 //route handler / controller
//  app.get('/user/:userId/:name/:password', (req, res)=>{
//     // console.log(req.query);
//     console.log(req.params);
//      res.send({firstName: 'Urwa', lastName: 'Ali'});
//     })
// this will only handle GET call to '/user'
// app.get('/ab?c', (req, res)=>{
//     res.send({firstName: 'Urwa', lastName: 'Ali'});
// })
// app.post('/user', (req, res)=>{
//     res.send({msg:"Data saved successfully", success: true});
// })
// app.delete('/user', (req, res)=>{
//     res.send({msg:"Data Deleted successfully", success: true});
// })

// //this is our request handler
// // this will match all the http method appi calls to '/test'
//  app.use(
//     "/user",
//     (req, res, next)=>{
//     console.log("Hello from the server!")
//     // res.send("Hello from the server!")
//     next()
//     }, 
//     (req, res)=>{
//      console.log("Hello from the 2nd server!")
//     res.send("Hello from the server! 2")
//      }
// )
//  app.use("/test",(req, res)=>{
// res.send("Hello from the server!")
//  })

//  app.use("/hello/2",(req, res)=>{
// res.send("Cheem dabaak dum dummm!")
//  })
//  app.use("/hello",(req, res)=>{
// res.send("Hello helloo helloo from the server!")
//  })

//  app.use("/",(req, res)=>{
// res.send("Only Slash! Welcome to root!")
//  })

 app.listen(3000, ()=>{
    console.log("Server is succeessfully listening on port 3000")
 }); // now our app has start listening on port 3000
 
/**
 * when we browse localhost:3000, it means we are making a request to the server and our request will be listened by request handler and then it will send response 
 */