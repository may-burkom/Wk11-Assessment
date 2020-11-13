const express = require('express')
const router = express.Router()

const Doctor = require('./model/Doctor')
const Patient = require('./model/Patient')

router.get('/', function(req, res){
    //couldn't figure a way to store the data returned from .find({})
    Doctor.find({})
        .then(function(docArr){
            Patient.find({})
            .then(function(patientArr){
                res.render('home', {patientList: patientArr, doctorList: docArr})
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
})

router.get('/doctor', function(req, res){
    res.render('doctor', {savedDoctor: ''})
})

router.get('/patient', function(req, res){
    Doctor.find({})
        .then(function(docArr){
            console.log(docArr)

            res.render('patient', {docArr: docArr, patient: ''})
        })
        .catch((err) => console.log(err))
})

router.get('/findusers', function(req, res){
    User.find({name: req.query.user})
        .then(function(userArr){
            if(userArr.length > 0){
                res.render('users')
            } else{
                res.render('home')
            }
        })
        .catch((err) => console.log(err))
})

router.post('/staff-save', function(req, res){
    let newDoc = new Doctor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newDoc.save()
        .then(function(savedArr){
            console.log(savedArr)
            res.render('doctor', {savedDoctor: `${savedArr.name} added!`})
        })
        .catch((err) => console.log(err))
})

router.post('/patient-save', function(req, res){
    let newPatient = new Patient({
        name: req.body.name,
        doctor: req.body.doctor,
        password: req.body.password
    })
    newPatient.save()
        .then(function(savedUser){
            res.render('patient', {docArr: [{name: 'asds'}, {name: 'dff'}], patient: `Patient added: ${savedUser.name}`})
        })
        .catch((err) => console.log(err))
})

router.delete('/delete-doc/:id', function(req, res){
    Doctor.findByIdAndDelete(req.params.id, (dltUser)=> console.log(dltUser))
})

router.delete('/delete-patient/:id', function(req, res){
    Patient.findByIdAndDelete(req.params.id, (dltUser)=> console.log(dltUser))
})

module.exports = router