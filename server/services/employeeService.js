const employeeRepo = require('../repositories/employeeRepo')

const getAllEmployees = () => {
    return employeeRepo.getAllEmployees();
}

const getEmployeeById = (id) => {
    return employeeRepo.getEmployeeById(id);
}

const addEmployee = (obj) => {
    return employeeRepo.addEmpolyee(obj);
}

const updateEmployee = (id, obj) => {
    return employeeRepo.updateEmployee(id, obj)
}

const deleteEmployee = (id) => {
    return employeeRepo.deleteEmployee(id);
}



module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee, 
    deleteEmployee
}