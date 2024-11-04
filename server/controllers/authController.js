const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService')

const router = express.Router();
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; // serect key for jwt

// Entry Point: http://localhost:3000/auth




router.post('/login', async(req, res) => {
    const {username, email} = req.body
    console.log(username, email);
    const users = await userService.getAllUsers();
    // check if details are true

    const validUserName = users.find((user) => user.username == username);
    const vaildEmail = users.find((user) => user.email == email);
    
    if (!vaildEmail || !validUserName){
        res.status(400).json({
            message: 'One or more details are wrong. Please Try again',
            error: 'Invalid parameters'
        });
    }
    else{

    if(validUserName!= undefined && vaildEmail != undefined){
        res.status(200);
        const userId = validUserName.id;
        const name = validUserName.name;
        const token = jwt.sign({id: userId}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token:token, id: userId, name: name})
    }
}
})

module.exports = router