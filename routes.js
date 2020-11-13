const express = require('express')
const router = express.Router()

const Doctor = require('./model/Doctor')
const Patient = require('./model/Patient')

router.get('/', function(req, res){
    res.render('home', {staffNotFound: '', patientNotFound: ''})
})

router.get('/doctor', function(req, res){
    res.render('doctor', {savedDoctor: ''})
})

router.get('/patient', function(req, res){
    Doctor.find({})
        .then(function(docArr){
            res.render('patient', {docArr: docArr, patient: ''})
        })
        .catch((err) => console.log(err))
})

router.get('/search-staff', function(req, res){
    Doctor.find({name: req.query.searchStaff})
        .then(function(userArr){
            if(userArr.length > 0){
                res.render('staffDisplay', {foundUser: userArr[0]})
            } else{
                res.render('home', {staffNotFound: 'Staff member not found', patientNotFound: ''})
            }
        })
        .catch((err) => console.log(err))
})

router.get('/search-patient', function(req, res){
    Patient.find({name: req.query.searchPatient})
        .then(function(userArr){
            if(userArr.length > 0){
                res.render('display', {foundUser: userArr[0]})
            } else{
                res.render('home', {staffNotFound: '', patientNotFound: 'Patient not found'})
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
        doctor: req.body.doc,
        password: req.body.password
    })
    newPatient.save()
        .then(function(savedUser){
            res.render('patientDisplay', {patient: `Patient added: ${savedUser.name}`})
        })
        .catch((err) => console.log(err))
})

router.delete('/delete-staff/:id', function(req, res){
    Doctor.findByIdAndDelete(req.params.id, (dltUser)=> console.log(dltUser))
})

router.delete('/delete-patient/:id', function(req, res){
    Patient.findByIdAndDelete(req.params.id, (dltUser)=> console.log(dltUser))
})

module.exports = router