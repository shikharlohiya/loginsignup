import express from "express"
import cors from "cors"
import multer from 'multer'
import path from 'path';
import mongoose from "mongoose"

const upload = multer({dest:'public/' })

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})



app.post('/api/image',upload.single('image') ,(req,res)=>{
    console.log(req)
    if(!req.file){
      return  res.send({code:500, msg: 'err'});
    }else {
       return res.send({code:200,msg: 'upload success'})
    }
})
app.post('/api/body' ,(req,res)=>{
    console.log(req.body)
    


})