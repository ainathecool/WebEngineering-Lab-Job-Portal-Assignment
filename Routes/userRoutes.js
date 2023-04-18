
const {signup, login, verifyUserLoggedIn } = require("../Controllers/userController");
const {checkEmployer, checkStudent, checkPlacementOfficer} = require( "../authenticate");
const {jobPosting,getAllJobs, searchJobs} = require("../Controllers/jobController");
const {JobApplication, JobReview} = require("../Controllers/applicationController");
const {upload} = require('../util') 
const jwt = require("jsonwebtoken");
const userRouter = require("express").Router();



userRouter.get("/JobListening", verifyUserLoggedIn, checkStudent, getAllJobs);
userRouter.get("/SearchJobs", verifyUserLoggedIn, checkStudent, searchJobs);


userRouter.get("/signup", signup)
userRouter.get("/login", login)
//userRouter.post("/checkStudent", checkStudent)
//userRouter.post("/checkEmployer", checkEmployer)
//userRouter.post("/checkPlacementOfficer", checkPlacementOfficer)

userRouter.get("/Student", verifyUserLoggedIn, checkStudent, (req,res, next)=>{
    res.status(201).send({"Message":"Student Browser"})
})

userRouter.get("/Employer", verifyUserLoggedIn, checkEmployer, (req,res, next)=>{
    res.status(201).send({"Message":"Employer Browser"})
})

userRouter.get("/po", verifyUserLoggedIn, checkPlacementOfficer, (req,res, next)=>{
    res.status(201).send({"Message":"Placement Officer Browser"})
})

userRouter.get("/Employer/PostJobs", verifyUserLoggedIn, checkEmployer, jobPosting, (req,res,next)=>{
    res.status(201).send({"Message": "Job posting!"})
})

userRouter.post("/Student/ApplyForJobs", verifyUserLoggedIn, checkStudent, upload.array("file"), JobApplication, (req,res,next)=>{
    res.status(201).send({"Message": "Job Application!"})
})

userRouter.get("/Employer/ReviewApplications", verifyUserLoggedIn, checkEmployer, JobReview, (req,res,next)=>{
    res.status(201).send({"Message": "Job Review!"})
})

//router.post('/post' , upload.array("file") ,  addArticle );

userRouter.get("/")

module.exports = userRouter;


