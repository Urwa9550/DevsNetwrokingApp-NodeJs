 const adminAuth =  (req, res, next)=>{
console.log("Authorization process running...")
// const token = "abshbhfjhjfhjdfh"
const token = "xyzaaa";
const isAdminAuthorized = token === "xyz";

if(!isAdminAuthorized){
        console.log("Authorization process running... if")
        res.status(401).send( "Unauthorized request");
    } else{
        console.log("User Authorized Successfully")
        next();
    }
    };

module.exports = {
    adminAuth,
}