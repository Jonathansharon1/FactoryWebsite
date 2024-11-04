const axios  = require('axios');
const User = require('../models/userModel');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getAllUsers = async() => {
    const {data} = await axios.get(USERS_URL);
    return data;
}

const getUsersDB = (filters) => {
    return User.find(filters)
}

const getUserById = (id) => {
    return User.findById(id);
}


module.exports = { 
    getAllUsers,
    getUsersDB,
    getUserById
}
