const Employee = require('../models/empolyeeModel')


const getAllEmployees = (filters) => {
    return Employee.find(filters)
}


// This functions returns all the employees by department name
const getEmployeeByDepartment = (departmentName) => {
    const employees = Employee.find({department: departmentName}); // find employees in department
    return employees;
}

const getEmployeeById = (id) => {
    return Employee.findById(id)
}

const addEmpolyee = (obj) => {
    const emp = new Employee(obj);
    return emp.save();
}


const updateEmployee = (id, obj) => {
    return Employee.findByIdAndUpdate(id, obj);
}

const deleteEmployee = (id) => {
    return Employee.findByIdAndDelete(id);
}



module.exports = { 
    getAllEmployees,
    getEmployeeById,
    getEmployeeByDepartment,
    addEmpolyee,
    updateEmployee,
    deleteEmployee
}
