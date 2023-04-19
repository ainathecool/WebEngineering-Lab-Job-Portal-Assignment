const express = require("express");
const uRoutes = require("./Routes/userRoutes");
const mongoose = require("mongoose");
const User = require("./Models/userModel")
require("dotenv").config();

const cors = require('cors');

// ...




mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})
const app = express()
app.use(express.json())
app.use(cors());
app.use("/user", uRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})


app.post("/signup", (req,res)=>{
    console.log(req.body)
    let {username, password, name, email, role, contact} = req.body;

    let user = new User({
        username,
        password,
        name,
        email,
        contact,
        role
    })

    user.save().then((user)=>{
        if(!user){
            res.status(400).json({"message": "User not created"})
        }
        else{
            res.status(201).json({"Message": "User created successfully", user:user})
        }

    }).catch(err =>{
        res.status(400).json({err:err, "message": "User not created"})
    })
    res.send("User Signup")
})

app.post("/login", (req,res)=>{
    res.send("User login")
})

//defining end points through routes
app.get("/user", (req,res) => {
    res.send("User Route")
})

app.get("/", (req,res) => {
    res.send("Base Route")
})


