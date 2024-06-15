
const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    _id: String,
    userType: String,
    username: String,
    email:String,
    password:String
},{timestamps:true})


const userdb = new mongoose.model("usercollection",userSchema)

module.exports=userdb;