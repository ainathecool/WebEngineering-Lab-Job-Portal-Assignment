const Job = require("../Models/jobModel");
const jwt = require("jsonwebtoken");

let jobPosting = (req,res) => {
    
    let {title, description, tag, salary, location, experience} = req.body;

    let job = new Job({
        title,
        description,
        tag,
        salary,
        location,
        experience
    })

    job.save().then((job)=>{
        if(!job){
            res.status(400).json({"message": "Job not posted"})
        }
        else{
            res.status(200).json({"Message": "Job posted successfully", job:job})
        }

    }).catch(err =>{
        res.status(400).json({err:err, "message": "Job not posted"})
    })

    }
  

    let getAllJobs = (req, res) => {
      Job.find({})
        .then((jobs) => {
          res.status(200).json({ jobs });
        })
        .catch((err) => {
          res.status(400).json({ err: err, message: "Error fetching jobs" });
        });
    };
    
    let searchJobs = (req, res) => {
      console.log(req.body)
      const keyword = String(req.body.keyword); // Convert the value to a string
      Job.find({ title: { $regex: keyword, $options: "i" } })
          .then((jobs) => {
              res.status(200).json({ jobs });
          })
          .catch((err) => {
              console.error('Error searching for jobs:', err);
              res.status(400).json({ err: err, message: "Error searching for jobs" });
          });

  };
  
  
    
    module.exports = {
      getAllJobs,
      searchJobs,
      jobPosting
    };
    
