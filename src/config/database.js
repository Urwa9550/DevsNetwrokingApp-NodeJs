const mongoose = require("mongoose");

const clusterURI = 'mongodb+srv://urwaali9550:X29byP3Mm9ANFfIm@devtinder0.rzxv8.mongodb.net/'
const databaseName = 'devTinder';
const connectDB = async () => {
    await mongoose.connect(clusterURI+databaseName);
};

module.exports = connectDB;

