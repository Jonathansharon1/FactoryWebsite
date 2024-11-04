const express = require('express');
const jwt = require('jsonwebtoken')
const userService = require('../services/userService');
const employeeService = require('../services/employeeService')
const departmentService = require('../services/departmentService')
const shiftService = require('../services/shiftService')

const router = express.Router();
require('dotenv').config(); // Environment variables
const SECRET_KEY = process.env.SECRET_KEY; // serect key for jwt
// Entry point: http://localhost:3000/factory

// Get All Persons
router.get('/', async (req, res) => {
  const token = req.headers['x-access-token']; // Property for the token
  
  if(!token){
    res.status(401).json('No Token Provided')
  }


  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err){
      res.status(500).json('Failed to authenticate token');
    }
    console.log(data);

  })



  try {
    const filters = req.query;
    const users = await userService.getAllUsers(filters);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// Get all users

router.get('/users', async(req,res) => {
  const users = await userService.getUsersDB()
  res.json(users)
})

// Get user by id
router.get('/user/:id', async(req,res) => {
  const {id} = req.params;
  const name = await userService.getNameById(id);
  const user = await userService.getUserByName(name);
  res.json({id:user.id,name:name, actions:user.actions})
})

// Get all employees
router.get('/employees', async(req,res) => {
  const employees = await employeeService.getAllEmployees();
  
  res.json(employees);
})

// Get employees by id
router.get('/employees/:id', async(req,res) => {
  const {id} = req.params;
  const employee = await employeeService.getEmployeeById(id);
  res.json(employee);
})

// Add employee
router.post('/addEmployee', async(req,res) => {
  const obj = req.body;
  console.log(obj)
  const newEmployee = await employeeService.addEmployee(obj)
  res.json(newEmployee);
})

// Update Employee
router.put('/updateEmployee/:id', async(req,res) => {
  const {id} = req.params;
  const obj = req.body;
  console.log(obj)
  const updatedEmoloyee = await employeeService.updateEmployee(id,obj);
  res.json(updatedEmoloyee)
})

// Update employee using patch (spesific field)
router.patch('/updateEmployee/:id', async(req,res) => {
  const {id} = req.params;
  const departmentID = req.body;
  const updatedEmoloyee = await employeeService.updateEmployee(id, departmentID)
  res.json(updatedEmoloyee);
})

// Delete employee
router.delete('/deleteEmployee/:id',async(req,res) => {
  const {id} = req.params;
  const deletedEmployee = await employeeService.deleteEmployee(id);
  res.json(deletedEmployee);
} )

// Get all shifts
router.get('/shifts', async(req,res) => {
  const shifts = await shiftService.getAllShifts();
  console.log(shifts)
  res.json(shifts)
})

// Get shift by id
router.get('/shifts/:id', async(req,res) => {
  const {id} = req.params;
  const shift = await shiftService.getShiftById(id);
  res.json(shift);
})


// Get all departments
router.get('/departments', async(req,res) => {
  const departments = await departmentService.getAllDepartments();
  res.json(departments)
})

// Get department by id
router.get('/department/:id', async(req,res) => {
  const {id} = req.params;
  const dep = await departmentService.getDepById(id);
  console.log(dep)
  res.json({id: dep._id, name:dep.name, manager: dep.manager})
})

// Add department
router.post('/addDepartment', async(req,res) => {
  const obj = req.body;
  const newDep = await departmentService.addDepartment(obj)
  res.json(newDep);
})

// Update department
router.put('/updateDepartment/:id', async(req,res) => {
  const {id} = req.params;
  const obj = req.body;
  const updatedDepartment = await departmentService.updateDepartment(id, obj)
  res.json(updatedDepartment)
})

// Delete department
router.delete('/deleteDepartment/:id',async(req,res) => {
  const {id} = req.params;
  const deletedEmployee = await departmentService.deleteDepartment(id)
  res.json(deletedEmployee);
} )

// Add New Shift
router.post('/addShift', async(req,res) => {
  const obj = req.body;
  const newShift = await shiftService.addShift(obj)
  res.json(newShift);
})

// Update shift
router.put('/updateShift/:id', async(req,res) => {
  const {id} = req.params;
  const obj = req.body;
  const updatedShift = await shiftService.updateShift(id, obj)
  res.json(updatedShift);
})

// Add action to json file
router.get('/addAction/:id', async(req,res) => {
  const {id} = req.params;
  const addActionToJson = await userService.addActionToJson(id);
  res.json(addActionToJson);
})





module.exports = router;