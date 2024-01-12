const mongoose=require('mongoose')

const registerSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String
    },
    userImage:{
        type:[String],
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        required:true
    }
})

const Register=mongoose.model('register ',registerSchema)

module.exports=Register