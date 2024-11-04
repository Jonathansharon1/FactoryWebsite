const userRepo = require('../repositories/usersRepo');
const jsonfile = require('jsonfile');
const filePath = '.././usersJson.json'


const getAllUsers = async(filters) => {
    return userRepo.getAllUsers();
}

const getUsersDB = async() => {
    return userRepo.getUsersDB();
}


//Will take the ID from the url and find the name
const getNameById = async(id) => {
    const users = await userRepo.getAllUsers();
    const userDetails = users.find((user) => user.id == id);
    const name = userDetails?.name;
    return name;

}

// Take the name from the function above and get the numOfActions
const getUserByName = async(name) => {
   const user = await userRepo.getUsersDB({fullName: name });
   const id = user[0]?._id;
   const actions = user[0]?.numOfActions;
   return { id, actions};
}


// Get The date in specific format
const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Day of the month
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
  };


  // Read file 
const readFile = async() =>{
    try {
        const data = await jsonfile.readFile(filePath);
        return data
        
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

// Add Action to json
const addActionToJson = async (userId) => {
    const data = await readFile();
    if (data){
    const actions = data?.actions 
    const today = getFormattedDate(); // get today's date
    console.log(today);
    let redirect = false;

    let actionsAllowed = 5;
    actions.forEach((action) => {
        if (action.id === userId && action.date === today && action.actionsAllowed < actionsAllowed) {
            actionsAllowed = action.actionsAllowed;
        }
        if(action.id === userId && action.date === today && action.actionsAllowed <= 0){
             redirect = true; // Flag for redirected
        }
    });
    const maxActions = await userRepo.getUserById(userId);
    const newAction = { id: userId, maxActions: maxActions.numOfActions, date: today, actionsAllowed: actionsAllowed - 1 };
    if(actionsAllowed > 0 ){
    console.log('New Action:', newAction);
    actions.push(newAction);

    jsonfile.writeFile(filePath, data, { spaces: 2 })
        .then(() => console.log('Data added successfully!'))
        .catch((error) => console.error('Error writing to file:', error));
    }

    return {newAction, redirect}
    }
};
   

       


module.exports = { 
    getAllUsers,
    getUsersDB,
    getNameById,
    getUserByName,
    addActionToJson
}
