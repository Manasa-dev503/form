var mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

var registerSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    mobilenumber : String,
    dob : String
})

var Register = mongoose.model('register',registerSchema)

module.exports = Register