import axios from "axios";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container,  Box } from '@mui/material';
import ActionsComp from "../Actions";



const AddDepComp = (props) => {

    const AddDep_URL = 'http://localhost:3000/factory/addDepartment';
    const URL = 'http://localhost:3000/factory';
    const location = useLocation();
    const userIdDB = location.state.userIdDB;
    const navigate = useNavigate();


    
    const [newDepData, setNewDepData] = useState({
        name: '',
        manager: '',
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDepData((prev) => ({ ...prev, [name]: value }));
  };
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const addDep = async() => {
    try{
    console.log(newDepData)
    const response = await axios.post(`${AddDep_URL}`, newDepData)
    console.log('Employee added successfully:', response.data)
    alert('Employee added successfully')
    addAction();
    } catch(err){
        console.log('Error', err)
    }
  }
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
            Add new Department
            </h2>
          <TextField
            label="Department Name"
            name="name"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Manager ID"
            name="manager"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
        <Button onClick={addDep} variant="contained" color="primary" fullWidth>
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

export default AddDepComp;
