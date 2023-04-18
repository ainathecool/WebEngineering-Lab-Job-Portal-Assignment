const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , '.\\public\\appFiles\\')
    },
    filename:(req , file , cb)=>{
        cb(null ,Date.now()+file.originalname)
    }
})


const filter = (req , file , cb)=>{
    if(file.mimetype == 'application/pdf'){
        cb(null , true)
    }else{
        cb(new Error("UnSupported file") , false)
    }
}


const upload = multer({
   storage:storage,
   fileFilter:filter,
    limits:1024*1024*10
})

module.exports = {
    upload,
    storage,
    filter
}

/*
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '.\\public\\ApplicationFiles\\')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+file.originalname)
    }
       
})

const filter = (req, res, cb)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){  //yaani sirf png file leyga 
        cb(null, true) //true means k upload karadain
    }else{
        cb(new Error("Unsupported file"), false) //yaani fil enai uplaod karni due to false
    }
}

const upload = multer({
    storage: storage,
  //  fileFilter: filter,
   // limits:1024*1024*10
})


module.exports = {
    upload,
    storage,
    filter
}

*/

//const { checkloggedin, uploadimage, upload} = require('../util')  - importimg upload 
//router.post('/post', upload.array("file") or upload.single("file") or upload.fields({name:'file1', maxCount:1}, {name: 'file2', maxCount:1}), addArticle)

//Images: req.file.path - when new artcile created udhar yeh attribute

//postman ma body ma form-data ma kaam karna hai
// for file.array use file k multiple types eg file file file  tou wo inn saray ko as array of files lega
//console.log karatay hovay req.files output karayenga 

//upload.fields yaani agar different fields sa files aarhi hoon, or postman 
//pa bhe aesay file1 file2 file 3 etc karna 