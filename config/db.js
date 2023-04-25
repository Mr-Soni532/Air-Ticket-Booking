const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.mongoURI;


const connectToMongo = async () =>{
    try {
        await mongoose.connect(mongoURI)
        console.log('Connected to Mongo')
    } catch (error) {
        console.log({msg: 'Error while connecting to mongoose', error})
    }
}
module.exports = connectToMongo;