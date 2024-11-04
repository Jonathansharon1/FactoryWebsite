const shiftRepo = require('../repositories/shiftsRepo')

const getAllShifts = () => {
    return shiftRepo.getAllShifts();
}

const getShiftById = (id) => {
    return shiftRepo.getShiftById(id);
}

const addShift = (obj) => {
    return shiftRepo.addShift(obj);
}

const updateShift = (id, obj) => {
    return shiftRepo.updateShift(id, obj)
}



module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift, 
}