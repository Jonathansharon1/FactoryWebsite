const departmentRepo = require('../repositories/departmentsRepo');

const getAllDepartments = () => {
    return departmentRepo.getAllDepartments();
} 

const getDepById = async(id) => {
    const departments = await departmentRepo.getAllDepartments();
    const departmentDetails = departments.find((dep) => dep.id == id)
    return departmentDetails
}



const addDepartment = (obj) => {
    return departmentRepo.addDepartment(obj);
}

const updateDepartment = (id, obj) => {
    return departmentRepo.updateDepartment(id, obj)
}

const deleteDepartment = (id) => {
    return departmentRepo.deleteDepartment(id)
}

module.exports = {
    getAllDepartments,
    getDepById,
    addDepartment,
    updateDepartment,
    deleteDepartment
}
