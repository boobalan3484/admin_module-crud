const express = require('express')

const router = express.Router()

const multer = require('multer');

const { v4: uuid } = require('uuid');

const loginModel = require('../model/loginModel')

const empModel = require('../model/addEmpModel')

const uploadPath = './public/'

// Set up storage engine
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // cb(null, Date.now() + '-' + fileName)
        cb(null, uuid().slice(0, 6) + '-' + fileName)
    }
});

// Init upload
const upload = multer({
    storage: storage
});


// // // ========== POST Method - Login Authentication ==========

// // API endpoint to 'post' register / login user

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await loginModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new loginModel({
            username,
            password, // In a real application, you should hash the password before storing it
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await loginModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check the password
        if (user.password !== password) { // For security reasons, never store passwords in plain text in a real app
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successfull' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// // ========== GET method - Fetch All Employee ==========

// API endpoint to 'get' all employee

router.get("/getAllEmployee", async (req, res) => {
    try {
        let findAllData = await empModel.find();
        res
            .status(200)
            .json({
                status: 200,
                message: "Data fetch successfully",
                error: false,
                data: findAllData,
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                status: 400,
                message: error.message,
                error: true
            });
    }
});


// // ========== GET method - Fetch Single Employee ==========

// API endpoint to 'get' employee by '_id'

router.get('/getEmployee/:_id', async (req, res) => {
    const _id = req.params._id;

    // Find the employee by emp_id
    const employee = await empModel.findById({ _id });

    if (!employee) {
        return res.status(404).json({
            status: 404,
            message: 'Employee not found',
            error: true
        });
    }
    try {
        res.status(200).json({
            status: 200,
            message: 'Employee found successfully',
            error: false,
            data: employee
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            error: true
        });
    }
});


// ========== POST Method - add single employee ==========

// API endpoint to 'post' employee

router.post('/addEmployee', upload.single('avatar'), async (req, res) => {

    let reqData = req.body;

    const url = req.protocol + '://' + req.get('host')

    const lastEmployee = await empModel.find({}).sort({ _id: -1 }).limit(1);

    const id = lastEmployee.length ? lastEmployee[0]._id + 1 : 1;

    let empData = new empModel({
        _id: id,
        name: reqData.name,
        mobile: reqData.mobile,
        email: reqData.email,
        designation: reqData.designation,
        gender: reqData.gender,
        course: reqData.course,
        avatar:
            // req.file.filename
            url + '/uploads/' + req.file.filename

    });
    try {
        let sendData = await empData.save();
        res
            .status(200)
            .json({
                status: 200,
                message: 'Data added successfully!',
                error: false,
                data: sendData,
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                status: 400,
                message: error.message,
                error: true
            });
    }
});


// // ========== PATCH method - update single employee ==========

// // API endpoint to 'update' employee by '_id'

router.patch('/updateEmployee/:_id', upload.single('avatar'), async (req, res) => {

    const _id = req.params._id;

    const url = req.protocol + '://' + req.get('host')

    let reqData = req.body

    try {
        // Find the existing employee by _id
        let existingEmployee = await empModel.findById(_id);

        if (!existingEmployee) {
            return res.status(404).json({
                status: 404,
                message: 'Employee not found',
                error: true
            });
        }

        let updatedData = new empModel({
            name: reqData.name,
            mobile: reqData.mobile,
            email: reqData.email,
            designation: reqData.designation,
            gender: reqData.gender,
            course: reqData.course,
            avatar:
                // req.file.filename

                req.file ? url + '/uploads/' + req.file.filename : existingEmployee.avatar        // the already uploaded image is retained if no new image is uploaded

            // url + '/uploads/' + req.file.filename

        });

        // Find the employee by _id
        let updateEmployee = await empModel.findByIdAndUpdate({ _id }, { ...updatedData }, { new: true });

        // Save the updated employee data
        let updatedEmployee = await updateEmployee.save();

        res.status(200).json({
            status: 200,
            message: 'Employee updated successfully',
            error: false,
            data: updatedEmployee,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            error: true
        });
    }
});


// ========== DELETE method - Remove Single Employee ==========

// API endpoint to 'delete' employee by '_id'

router.delete('/deleteEmployee/:_id', async (req, res) => {
    const _id = req.params._id;

    // Find the employee by _id and delete it
    const deletedEmployee = await empModel.findByIdAndDelete({ _id });

    if (!deletedEmployee) {
        return res.status(404).json({
            status: 404,
            message: 'Employee not found',
            error: true
        });
    }

    try {
        res.status(200).json({
            status: 200,
            message: 'Employee deleted successfully',
            error: false,
            data: deletedEmployee,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            error: true
        });
    }
});

module.exports = router;