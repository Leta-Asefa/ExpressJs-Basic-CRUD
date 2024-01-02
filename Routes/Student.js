const express = require('express')
const router = express.Router()
const Student=require('../Models/Student')

router.get('/', async(req,res) => {
    try {
        const students= await Student.find()
        res.json(students)

    } catch (err) {
        res.send(err)
    }
})


router.get('/:id', async(req,res) => {
    try {
        const student= await Student.findById(req.params.id)
        res.json(student)

    } catch (err) {
        res.send(err)
    }
})

router.get('/getByRollNumber/:rollNumber', async(req,res) => {
    try {
        const student= await Student.find({rollNumber:req.params.rollNumber})
        res.json(student)

    } catch (err) {
        res.send(err)
    }
})

router.post('/', async (req, res) => {
    const student = new Student({
        rollNumber: req.body.rollNumber,
        name: req.body.name,
        age: req.body.age,
        university: req.body.university,
        isActive: req.body.isActive,
        techStack:req.body.techStack 
    })


    try {

        const result=await student.save()
        res.json(result)

    } catch (err) {
        res.send(err)
    }

})

module.exports=router