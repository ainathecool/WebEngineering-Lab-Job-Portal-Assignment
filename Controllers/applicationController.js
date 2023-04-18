const ApplicationApply = require("../Models/applicationModel");
const jwt = require("jsonwebtoken");

let JobApplication = (req,res) => {
    
    let {jobTitle, userEmail, ApplicationFiles, appStatus} = req.body;

    let Application = new ApplicationApply({
        jobTitle,
        userEmail,
        ApplicationFiles : req.files.map(file => file.path),
        appStatus
    })

    Application.save().then((Application)=>{
        if(!Application){
            res.status(400).json({"message": "Application not registered"})
        }
        else{
            res.status(200).json({"Message": "Application registered successfully", Application:Application})
        }

    }).catch(err =>{
        res.status(400).json({err:err, "message": "Application not registered"})
    })

    }

    let JobReview = (req,res,next)=>{

        ApplicationApply.findOne({appStatus: "pending"}).then(foundPendingApplication =>{

            if(!foundPendingApplication){
                res.status(404).send({"Message":"Application not exist"})
            }
            else{
                console.log(foundPendingApplication.appStatus);
                let review =1;
                if(review == 1)
                {
                    foundPendingApplication.appStatus = 'approved';
                    foundPendingApplication.save({ _id: foundPendingApplication._id, appStatus: "approved"})
                    res.status(200).send({"Message": "Application Approved"})
                    
                    console.log(foundPendingApplication.appStatus);
                    next();
                }
                else if(review == 0)
                {
                    foundPendingApplication.appStatus = 'rejected';
                    foundPendingApplication.save({ _id: foundPendingApplication._id, appStatus: "approved"})
                    res.status(200).send({"Message": "Application Rejected"})
                    console.log(foundPendingApplication.appStatus);
                    next();
    
                }
            }

        }).catch(e=>{
            res.status(500).send({e:e})
        });
 
    
    }
    module.exports = {
        JobApplication,
        JobReview
    }