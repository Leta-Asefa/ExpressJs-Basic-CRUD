const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    
    rollNumber: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true
    },
    university: {
        type: String,
        required:true
    },
    isActive: {
        type: Boolean,
        default:true
    },
    techStack: {
        type: Array,
        required:true
    },
    registratonDate:{
        type:Date,
        default:Date.now
    }

})



module.exports=mongoose.model('Student',StudentSchema)