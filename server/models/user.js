const mongoose = require ('mongoose');

const userschema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    name:{type:String,minlength:5},
    email:{type:String},
    gender:{type:String,enum:["male","female"]},
    profile:{type:String}
})

const User = mongoose.model('User',userschema)

module.exports = User;
