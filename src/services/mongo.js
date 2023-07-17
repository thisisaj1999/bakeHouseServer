const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI

async function connectDB() {
    try {
        await mongoose.connect(mongo_uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Mango is connected");
    } catch (err) {
        console.error(err);
    }
}
    
module.exports = { connectDB }  