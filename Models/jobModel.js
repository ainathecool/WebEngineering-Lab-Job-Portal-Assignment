const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({

    title:{
        type: String,
        required:true
    },

    description:{
        type: String,
        required: true,
    },

    tag:{
        type: String,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    experience: {
        type: String
    }

},

   { timestamps: true}
)


module.exports = mongoose.model("Jobs", jobSchema);