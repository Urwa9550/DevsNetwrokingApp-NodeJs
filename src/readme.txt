/**
 app.js is the starting point of the application 
 main core js file where we will write the nodejs code 
 **/ 

 /**
  * first we need to create backend
  * for this we need to create server
  * so that we can listen to the request of other users ( from outside world )
  * to create a server here we will be using  expressjs
  */
 
 ### 1.0.0 === Major.Minor.Patch
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