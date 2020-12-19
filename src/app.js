const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    // write your codes here
    res.status(200).json(Student);
})

// Add student to database
app.post('/students', async (req, res) =>{
    // write your codes here
    let newItem = {
        name :req.params.name,
        sex: req.params.sex,
        age: req.params.age,
        class: req.params.class,
        grade_point: req.params.grade_point, 
        time: new Date(),
        isDeleted : false
    }
    Student.push(newItem);
    res.status(201).json(newItem);
})

// Get specific student
app.get('/students/:id', async (req, res) =>{
    // write your codes here
    let found = Student.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})

// delete specific student
app.delete('/students/:id', async (req, res) =>{
    // write your codes here
    let found = Student.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found) {
        let target = Student.indexOf(found);
        Student.splice(target,1);
    } 
    res.sendStatus(204);
}) 


module.exports = app;



