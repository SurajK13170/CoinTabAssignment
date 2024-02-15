const mongoose = require("mongoose")
const schema = mongoose.Schema({
    _id:{
        type:Number, 
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // unique: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
})

const Usermodel = mongoose.model('User', schema)
module.exports = { Usermodel }