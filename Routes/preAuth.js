const express = require('express');
const router = express.Router();
const register = require('../Controllers/Register');
const auth = require('../Controllers/Auth');
const verifyUser = require('../Controllers/VerifyUser');
const addAttendance = require('../Controllers/HandleAttendance');
const preVerify = require('../Controllers/PreVerify');


router.use(express.json());

router.get("/",(req,res)=>{res.send("welcome to /user : handles user management including creation, deletion and updation of user accounts")});

router.get("/verify/:uid",verifyUser.verifyUser)

router.post("/register",register.registerUser);

router.post("/auth",auth.authenticate);

router.post("/add-attendance",addAttendance.addAttendance);

router.get("/get-attendance/:studentId",addAttendance.getStudentAttendance);

router.get("/get-students/:group",addAttendance.getStudentsByGroup);

router.get("/verify/:id",preVerify.preVerify);

module.exports = (router);