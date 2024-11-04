import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container,  Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ActionsComp from "../Actions";
import { useNavigate } from 'react-router-dom';


const EditEmployeeComp = () => {
  const location = useLocation();
  const employeeId = location.state.id;
  const userIdDB = location.state.userId; // save the user ID that comes from the DB, for addActionToJson
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    startWorkYear: '',
    shifts: []
  });
  const URL = 'http://localhost:3000/factory';
  const [rows,setRows] = useState([])
  const [shifts, setShifts] = useState([])
  const [selectShift, setSelectShift] = useState('')
  const navigate = useNavigate();



  // Get The employee data by the id
  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        const { data: emp } = await axios.get(`${URL}/employees/${employeeId}`);
        setEmployeeData({
          firstName: emp.firstName,
          lastName: emp.lastName,
          startWorkYear: emp.startWorkYear,
          shifts: emp.shifts

        });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    getEmployeeById();
  }, [employeeId]);

  // Load all shifts
  useEffect(() => {
    const getShifts =async () => {
    const {data}= await axios.get(`${URL}/shifts`)
    setShifts(data)
    console.log(shifts)
    }
    getShifts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

 


  // Update 
  const updateEmployee = async () => {
    try {
      const response = await axios.put(`${URL}/updateEmployee/${employeeId}`, employeeData);
      console.log('Employee updated successfully:', response.data);
      alert('Employee updated successfully')
      addAction();
    } catch (err) {
      console.error('Error occurred while updating employee:', err);
      alert('error')
    }
  };


  // Delete
  const deleteEmployee = async() => {
    try {
        const response = await axios.delete(`${URL}/deleteEmployee/${employeeId}`)
        console.log('Employee deleted successfully:', response.data)
        alert('Employee deleted successfully')
        addAction()
    } catch(err) {
        console.log('Error occurred while deleting employee:' , err)
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


    // create data for table rows
    function createData(date, startingHour, endingHour ) {
        return {date, startingHour, endingHour };
    }

    useEffect(() => {
        const newRows = (employeeData.shifts.map((shift) => {
                 return createData(shift.date, shift.startingHour, shift.endingHour);
        }));
        setRows(newRows);
    },[employeeData.shifts])

  
    const allocateShift = async() => {
        try {
            const response = await axios.put(`${URL}/updateEmployee/${employeeId}`, { $push: { shifts: selectShift } },);
            console.log('Shift pushed successfully:', response.data);
            alert('Shift pushed successfully')

          } catch (err) {
            console.error('Error occurred while push shift:', err);
            alert('error')
          }

          addAction() // add action to json

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
            {employeeData.firstName}'s Details & Shifts
            </h2>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={employeeData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={employeeData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Start Work Year"
            name="startWorkYear"
            variant="outlined"
            value={employeeData.startWorkYear}
            onChange={handleChange}
            required
            fullWidth
          />
          <div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px',marginBottom:'20px', gap: '10px'}}>
          <Button  onClick={updateEmployee} variant="contained" color="primary" fullWidth>
            Save
          </Button>
          <Button sx={{backgroundColor: '#ff4d4f'}} onClick={deleteEmployee} variant="contained" fullWidth>
                        Delete
          </Button>
          </div>
          <Divider />
          

    <h3>Shifts</h3>
    <TableContainer  sx={{backgroundColor: '#6A8DFF', borderRadius: '20px'}}>
                <Table sx={{ marginBottom: '10px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}}>Date</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Starting Hour</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Ending Hour</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell  sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align="center">{row.startingHour}</TableCell>
                                <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif"}} align="center">
                                   {row.endingHour}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px', marginBottom: '20px'}}>
            <h3> Allocate <label style={{fontWeight: 'bold', fontSize:'1.3rem'}}>{employeeData.firstName}</label> to existing shifts</h3>
            <Box sx={{ width: 350 }}>
            <FormControl fullWidth>
                <InputLabel  id="simple-select-label">Choose Shift</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setSelectShift(e.target.value)}
                label="Shift"
                value={selectShift}
                >
                {
                    shifts?.map((shift) => {
                        console.log(shift)
                        return <MenuItem key={shift.id} value={shift}> {shift.date} , {shift.startingHour} - {shift.endingHour}</MenuItem>
                    })
                }
                
                </Select>
            </FormControl>
            </Box>         
            <Button onClick={allocateShift} variant="contained" color="primary">Place it</Button> 
            </div>
            <Divider />

 
        </Box>
      </Container>
    </div>
  );
};

export default EditEmployeeComp;
