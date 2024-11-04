const Shift = require('../models/shiftModel')


const getAllShifts = (filters) => {
    return Shift.find(filters)
}


const getShiftById = (id) => {
    return Shift.findById(id)
}

const addShift = (obj) => {
    const shift = new Shift(obj);
    return shift.save();
}


const updateShift = (id, obj) => {
    return Shift.findByIdAndUpdate(id, obj);
}




module.exports = { 
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
}
