import { TextField, Button, Container,  Box } from '@mui/material';
import axios from "axios";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ActionsComp from '../Actions';


const AddEmployeeComp = (props) => {

    const URL = 'http://localhost:3000/factory';
    const navigate = useNavigate();
    const location = useLocation();
    const userIdDB = location.state.userIdDB; // save the user ID that comes from the DB, for addActionToJson



    
    const [newEmployeeData, setNewEmployeeData] = useState({
        firstName: '',
        lastName: '',
        startWorkYear: '',
        departmentID: ''
      });


    // Add Action to json file
    const addAction = async() => {
    // newAction - all the data that will add to the json file
    //redirected - check in the server(userService) if we need to logout
      try{
      const {data} = await axios.get(`${URL}/addAction/${userIdDB}`);
      if ( data.newAction.actionsAllowed <= 0 || data.redirected){
          alert('You have been redirected due to inactivity')
          navigate('/')
          sessionStorage.removeItem('token');
      
      }
      }catch(err){
        console.log(err)
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData((prev) => ({ ...prev, [name]: value }));
  };
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const addEmp = async() => {
    try{
    console.log(newEmployeeData)
    const response = await axios.post(`${URL}/addEmployee`, newEmployeeData)
    console.log('Employee added successfully:', response.data)
    alert('Employee added successfully')
    addAction()
    
    } catch(err){
        console.log('Error', err)
    }
  }


  

  return (
    <div>
      <ActionsComp/>
        <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <h2>
            Add new Employee
            </h2>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Start Work Year"
            name="startWorkYear"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
            <TextField
            label="Department ID"
            name="departmentID"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
        <Button onClick={addEmp} variant="contained" color="primary" fullWidth>
            Save
          </Button>
          <Button onClick={goBack} variant="contained" sx={{backgroundColor: '#ff4d4f'}} fullWidth>
            Cancel
          </Button>
          </Box>

          </Container>
    </div>
  )
};

export default AddEmployeeComp;
