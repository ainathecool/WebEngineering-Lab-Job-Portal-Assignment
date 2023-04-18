const mongoose = require("mongoose")

const applicationSchema = mongoose.Schema({

    jobTitle:{
        type: String
    },

    userEmail:{
        type: String
    },

    ApplicationFiles: {

        type: Array,
        required: true
    },
    appStatus: {
        type: String,
        required: true
    }

},

   { timestamps: true}
)


module.exports = mongoose.model("Application", applicationSchema);