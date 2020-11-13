const mongoose = require('mongoose')
const Patient = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Patient', Patient)