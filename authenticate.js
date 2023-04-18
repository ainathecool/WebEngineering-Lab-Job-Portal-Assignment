

let checkStudent = (req,res,next)=>{
 
    if(req.decoded.role == 'student'){
    console.log(req.decoded)
        next();
    }
    else
        res.status(401).send({"Message":"You are not student"})

}

let checkEmployer = (req,res,next)=>{
 
    if(req.decoded.role == 'employer'){
    console.log(req.decoded)
        next();
    }
    else
        res.status(401).send({"Message":"You are not Employer"})

}

let checkPlacementOfficer = (req,res,next)=>{
 
    if(req.decoded.role == 'placementOfficer'){
    console.log(req.decoded)
        next();
    }
    else
        res.status(401).send({"Message":"You are not Placement Officer"})

}


module.exports = {
    checkEmployer,
    checkStudent,
    checkPlacementOfficer
}