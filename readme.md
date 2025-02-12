
# app.js is the starting point of the application

# main core js file where we will write the nodejs code

 first we need to create backend for this we need to create server
 so that we can listen to the request of other users ( from outside world )
 to create a server here we will be using  expressjs

## 1.0.0 === Major.Minor.Patch

# patch: very small change , may be a bug fix

# Minor: minor change, where you put small features in the package (eg: express)  (safe to upgrade)

# Major: (changes that are not backword compatible means when going to a new version have breaking changes )

# ^ ( caret sign ) that means auto udpdate to 4.x.x

# ~  ( tilda sign ) that means ??

# npm install -g nodemon --> when u save the file, automatically refresh the server

# npm run dev -> dev cmd will run with nodemon

~~~~~~~~~ Home work ~~~~~~~~~
- create a repo
- Init a repo
- what are node_modules, package.json, packagee-lock.json
- Install express
- create a server
- listen to port 5000
- write request handler for /test, /hello
- Install nodemon and update scripts inside pakage.json
- what are dependencies
- what is the use of "-g" whiile npm install 
- Differene caret and tilde ( ^ vs ~ )
~~~~~~~~~  ~~~~~~~~~  ~~~~~~~~~  ~~~~~~~~~
~~~~~~~~~  ~~~~~~~~~  ~~~~~~~~~  ~~~~~~~~~

### Order of writing the routes Matter Alot!!

## advance routing techniques -> ( _?, _+, _*_ )it will work for request /ac as well as /abc ( Now 'b' is optional over here)
 app.get('/ab?c') // here 'b' is optional
 app.get('/ab+c') // here 'b' can repeat many times eg: /abbbbbbc the request will be successfull
 app.get('/ab*c') // here anything can come between 'ab' & 'c', should start with 'ab' and end with 'c' eg: /abdddfffgggzzzc or /ab-----c the request will be successfull
 app.get('/a(bd)?c') // here bd is optional eg: /ac and /abdc both will work

 app.get('/user?userId=101') // eg: [req.query]
 app.get('/user/:userId') // ':' or 'colon' means its a dnamic route eg: app.get('/user/101')
 app.get('/user/:userId/:name/:password') // ':' or 'colon' means its a dnamic route eg: app.get('/user/101/Alan/test111') [req.params]

## read use of regex in routes /a/ , /.*fly$/
## read query, params in routes
## Read the dynammic routes

## We can write as many route handlers as needed
# We can write as many callbacks as needed
# next() function
# app.use(
    "/user",
    (req, res, next)=>{
    console.log("Hello from the server!");
    // res.send("Hello from the server!");
    next(); // cmd to go to second route handler
    }, 
    (req, res, next())=>{
     console.log("Hello from the 2nd server!");
    //res.send("Hello from the server! 2");
    next();
     },
    (req, res)=>{
     console.log("Hello from the 2nd server!");
    res.send("Hello from the server! 2");
     }
)

# rh = route handlers
app.get(
    "/user", [rh1 ()=>{}, rh2 ()=>{}, rh3 ()=>{}, ...])

# we can also do 

app.get(
    "/user", (req, res, next())=>{
        console.log("Hello from the server 1!");
    next(); // cmd to go to second route handler
    })
app.get(
    "/user", (req, res)=>{
console.log("Hello from the server 2!");
    // res.send("Hello from the server!");
    })

## ~~~~~~~~~  route handlers and mmiddleware  ~~~~~~~~~
# they are called middlewares bcz they are called in the middle of the request chain  ( method chain )
app.get(
    "/", (req, res, next())=>{
        //thiis is a mmiddleware
        console.log("Hello from the server 1!");
    next(); // cmd to go to second route handler
    })

app.use(
    "/user",
    (req, res, next)=>{
         //thiis is also a mmiddleware
    console.log("Hello from the server!");
    next(); // cmd to go to second route handler
    }, 
    (req, res, next())=>{
         //this is also a middleware
     console.log("Hello from the 2nd server!");
    //res.send("Hello from the server! 2");
    next();
     },
    (req, res)=>{
        <!-- the route handler that actually sends back the response is route handler / response handler -->
     console.log("Hello from the 2nd server!");
    res.send("Hello from the server! 2");
     }
)


# Generally mmiddlewares are written using app.use()
# but there are no specific rules to write middlewares 
# Read what is middleware 
# How express Js basically handles the request beehind the scene?
# why do we need mmiddle wares
~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~

# Read HTTP status codes 

# Handle Auth middleware fo all request GET, POST, PUT, Delete
app.use("/admin", (req, res, next)=>{
const token = "abshbhfjhjfhjdfh"
const isAdminAuthorized = token === "xyz"

if(!isAdminAuthorized){
res.status(401).send({message: "Unauthorized request"});
} else{
    next();
}
});

# use app.use mostly
# Read difference between app.use() & app.all()
app.use("/admin", ()=>{
})

app.all("/admin", ()=>{

})




# Handle Auth middleware for a specific request GET 

app.get("/admin", (req, res, next)=>{
const token = "abshbhfjhjfhjdfh"
const isAdminAuthorized = token === "xyz"

if(!isAdminAuthorized){
res.status(401).send({message: "Unauthorized request"});
} else{
    next();
}
});

# "/admin" route will only be called for "/admin" middleswarees / route handlers eg: "/admin", "/admin/getAllUsers" etc

##~~~~~~~~~~~~~~~~~~ Error handling ~~~~~~~~~~~~~~~~~~
# if 4 parameters, first param will be treated as error

app.use('/getAllData', (err, req, res, next)=>{
    // logic of DB call and get user data 
<!-- res.send("Get All data"); -->

if(err){
    // here we should also log error ( so that I should also be notified) eg: in santry, or a logging service e.t.c.

    res.status(500).send("Something went wrong.")
}
});

app.use('/getAllData', (err, req, res, next)=>{
    //wild card error handling
    // make sure to add this only at the end of other route handlers, so that if anything breaks, u ccan caught it over here 
    // always use try and catcch 
    try{
      /**  throw new Error("Error xyz"); // on this line an error will occur due to which catch block will run */
        res.send("user data sent"); // thiis line will not execute bcz of the above throw new Error() line

    }catch(err){
        res.status(500).send("Internal Server Error");
    }
});

