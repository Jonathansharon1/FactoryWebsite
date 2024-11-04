const Department = require('../models/departmentModel')


const getAllDepartments = (filters) => {
    return Department.find(filters)
}



const addDepartment = (obj) => {
    const dep = new Department(obj);
    return dep.save();
}


const updateDepartment = (id, obj) => {
    return Department.findByIdAndUpdate(id, obj);
}

const deleteDepartment  = (id) => {
    return Department.findByIdAndDelete(id);
}



module.exports = { 
    getAllDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
}
