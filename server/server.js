const express=require('express')
const app=express()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs=require('fs')
const path = require('path')

app.use(express.json())
require('dotenv').config()
const Register=require('./db/register')
app.use(cors())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/',(req,res)=>{
    res.json("Hello World")
})

mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log("MongoDB Connected")
}).catch((error) => {
    console.log(error)
})

app.post('/register',async(req,res)=>{
    const {name,phone,email,userImage,password}=req.body
    const hasdedPassword=await bcrypt.hash(password,10)
    try {
        const user=new Register({
            name,
            phone,
            email,
            userImage,
            password:hasdedPassword,
            role:"User"
        })
        const response=await user.save()
        jwt.sign({
            name:name,
            phone:phone,
            email:email,
            userImage:userImage,
            id:response._id
        },jwtSecret,{},(err,token)=>{
            if(err) throw err
            res.cookie('token',token).json(token)
            console.log(token)
        })
    } catch (error) {
        console.log("Error sending the data to database",error)
    }
})

const photosMiddleware = multer({ dest: 'uploads/' })

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = []
    for (let i=0; i<req.files.length; i++) {
        const { path,originalname }=req.files[i]
        const parts=originalname.split('.')
        const ext=parts[parts.length - 1]
        const newPath=path + '.' + ext
        fs.renameSync(path, newPath)
        uploadFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadFiles)
})

const jwtSecret='ben10'

app.post('/login', async (req, res) => {
    console.log("Received login request")
    const {email,password}=req.body
    const userDocs=await Register.findOne({email})
    if(userDocs){
        const passOk=bcrypt.compareSync(password,userDocs.password)
        if(passOk){
            jwt.sign({
                name:userDocs.name,
                phone:userDocs.phone,
                email:userDocs.email,
                userImage:userDocs.userImage,
                id:userDocs._id,
                role:userDocs.role
            },jwtSecret,{},(err,token)=>{
                if(err) throw err
                res.cookie('token',token).json(token)
                console.log(userDocs)
            })
        }else{
            res.status(422).json('pass not ok')
        }
    }else {
        res.json('User not found')
    }
})

app.get('/getuser/:id',async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
        const response=await Register.findById(id)
        res.json(response)
    } catch (error) {
        console.log('Error getting the user from database',error)
    }
})

app.put('/editUser', async (req, res) => {
    const { name, phone, email, userImage, token, id, disable } = req.body
    try {
        const userData = jwt.verify(token, jwtSecret)
        const userDocs = await Register.findById(id)
        if (disable === "Admin" || (userDocs && userData.id === userDocs._id.toString())) {
                userDocs.set({ name, phone, email, userImage })
                await userDocs.save()
            jwt.sign(
                {
                    name: userDocs.name,
                    phone: userDocs.phone,
                    email: userDocs.email,
                    userImage: userDocs.userImage,
                    id: userDocs._id,
                    role: userDocs.role
                },
                jwtSecret,{},(err, newToken) => {
                    if (err) throw err
                    res.cookie('token', newToken).json(newToken)
                }
            )
        } else {
            res.status(403).json('Forbidden - User does not have permission to edit this user or user not found')
        }
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.delete('/deleteUser/:id',async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
        const deleteUser=await Register.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(404).json({message:'User not found'})
        }
        res.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

app.post('/adminUser',async(req,res)=>{
    const {name,phone,email,userImage,password}=req.body
    const hasdedPassword=await bcrypt.hash(password,10)
    try {
        const user=new Register({
            name,
            phone,
            email,
            userImage,
            password:hasdedPassword,
            role:"Admin"
        })
        const response=await user.save()
        jwt.sign({
            name:name,
            phone:phone,
            email:email,
            userImage:userImage,
            id:response._id
        },jwtSecret,{},(err,token)=>{
            if(err) throw err
            res.cookie('token',token).json(token)
            console.log(token)
        })
    } catch (error) {
        console.log("Error sending the data to database",error)
    }
})

app.get('/allUsers',async(req,res)=>{
    try {
        const users=await Register.find()
        res.json(users)
    } catch (error) {
        console.log("Error getting all the users", error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(4000,()=>{
    console.log("Conneted at 4000")
})
