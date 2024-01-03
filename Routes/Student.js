const express = require('express')
const router = express.Router()
const Student=require('../Models/Student')




//------------------------------------------------Get-------------------------------------------------------------

router.get('/', async(req,res) => {
    try {
        const students= await Student.find()
        res.json(students)

    } catch (err) {
        res.send(err)
    }
}) 
 
router.get('/getSelectedFieldsOnly', async(req,res) => {
    //to return the selected fields only the route should not be placed after a route that requires an objectId (id)
    try {
        const student= await Student.find().select('name age university -_id')
        res.json(student)

    } catch (err) {
        res.send(err)
    }
})

router.get('/:university', async(req,res) => {
     //to return the selected fields only the route should not be placed after a route that requires an objectId (id)
    try {
        const student= await Student.find({university:req.params.university}).select('name -_id').limit(2) // you can omit limit(1)
        res.json(student)

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
  
    //------------------------------------------------Post------------------------------------------------------------

router.post('/', async (req, res) => {
    const student = new Student({
        rollNumber: req.body.rollNumber,
        name: req.body.name,
        age: req.body.age,
        university: req.body.university,
        isActive: req.body.isActive,
        techStack:req.body.techStack ,
        registratonDate:req.body.registratonDate
    })


    try {

        const result=await student.save()
        res.json(result)

    } catch (err) {
        res.send(err)
    }

})

    //------------------------------------------------Update------------------------------------------------------------

router.patch('/:id', async(req, res) => {

    const existingDocument = await Student.findById(req.params.id);

    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' }); 
    }

        Object.keys(req.body).forEach((key) => {
            existingDocument[key] = req.body[key];
          });
      
          // Save the updated document
          const updatedDocument = await existingDocument.save();
      
          res.json(updatedDocument);
 



            //the way above updates only changed fields ...

            //One Way of doing update
    // const result = await Student.findByIdAndUpdate(
    //     req.params.id,
    //     { $set: { isActive: req.body.isActive } },
    //     { new: true } // to return the updated document
    //   );
  
    //   res.json(result);


    })

    //------------------------------------------------Delete------------------------------------------------------------

router.delete('/:id', async(req, res) => {
    const result = await Student.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0)
        res.status(404).json({ 'error': "Not Found" })

    res.json({"result":"Deleted Successfully !"})
})


module.exports=router