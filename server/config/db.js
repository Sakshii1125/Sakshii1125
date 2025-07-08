const mongoose = require('mongoose');

function connect (){
    mongoose.connect('mongodb://localhost:27017/userf')
    .then(()=>{console.log("database connected 🔥")})
    .catch((err)=>{console.log(err)})
}

module.exports = connect;