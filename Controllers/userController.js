const User = require("../Models/userModel")
const jwt = require("jsonwebtoken");

let signup = (req,res) => {
    
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
            res.status(200).json({"Message": "User created successfully", user:user})
        }

    }).catch(err =>{
        res.status(400).json({err:err, "message": "User not created"})
    })

    }


let login = (req,res) =>{
    let{username,password} = req.body;
    User.findOne({username:username}).then(founduser=>{
        if(!founduser){
            res.status(404).send({"Message":"User not exist"})
        }else{
            if(password=founduser.password){
                let token = jwt.sign({
                    id: founduser._id,
                    role: founduser.role,
                }, process.env.SECRET_KEY , {
                    expiresIn: '24h'
                })
                res.status(200).send({user:founduser, token:token})
            }else{
                res.status(400).send({"Message":"Password Not Match"})
            }
        }
    }).catch(e=>{
        res.status(500).send({e:e})
    });
}

var verifyUserLoggedIn = (req,res,next) =>{
    let token = req.headers['token'];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(!err){
            req.decoded = decoded;
            console.log(req);
            next();
        }else{
            res.status(401).send({"Message":"You are not authorised"})
        }

    })

}



module.exports = {
    signup,
    login,
    verifyUserLoggedIn,
}