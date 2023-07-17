// importing pakages
const http = require('http')
require('dotenv').config()

// importing local objects
const app = require('./app')
const { connectDB } = require('./services/mongo')

const PORT = process.env.PORT

// creating server using express app
const server = http.createServer(app)

// making function to start server and listen server
async function startServer(){
    await connectDB();
    server.listen(PORT, () => {
        console.log(`server is running on port:${PORT}`);
    })
}

// calling function 
startServer();