import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ActionsComp from '../Actions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate, useLocation } from 'react-router-dom';


const ShiftsComp = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModelAllocate, setOpenModalAllocate] = useState(false)
  const [selectedShift, setSelectedShift] = useState(null);
  const [shifts, setShifts] = useState([])
  const [notInShiftEmp, setNotInShiftEmp] = useState([]) //Check which employees are not in this shift
  const [selectedEmployee, setSelctedEmployee] = useState('')
  const URL = 'http://localhost:3000/factory';
  const navigate = useNavigate();
  const location = useLocation();
  const userIdDB = location.state;


  const [shiftData, setShiftData] = useState({
    date: '',
    startingHour: '',
    endingHour: '',
  })


  // Handle change to declare the new shift details by the user input in the modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData((prev) => ({ ...prev, [name]: value }));
  };



// Load all shifts
    useEffect(() => {
        const getAllShifts = async() => {
            const {data} = await axios.get(`${URL}/shifts`)
            setShifts(data);
        }
        getAllShifts()
    },[])


  // handle open modal when Edit shift
  const handleOpenModalEdit = (shift = null) => {
    setSelectedShift(shift);
    setOpenModalEdit(true);
  };

  // handle close modal when Edit shift
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectedShift(null);
  };

  // handle open modal when allocate shift
  const handleOpenModalAllocate = (shift) => {
    setSelectedShift(shift); 
    getEmployeesNotInShift(shift); // Then, fetch employees using the passed shift directly
    setOpenModalAllocate(true);
  };
  
  // handle close modal when allocate shift
  const handleCloseModalAllocate = () => {
    setOpenModalAllocate(false);
    setSelectedShift(null);
  };
  
  // Get all the employees that not allocate in that shift
  async function getEmployeesNotInShift(shift) {
    const { data: employees } = await axios.get(`${URL}/employees`);
    setNotInShiftEmp(
      employees.filter((employee) =>
        !employee.shifts.some((s) => s._id === shift?._id)
      )
    );
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
      


// Add shift
  const addShift = async() => {
    try{
    const response = await axios.post(`${URL}/addShift`, shiftData)
    console.log('Shift added successfully', response.data);
    alert('Shift added successfully')
    addAction();
    }catch (err){
        console.log('Error occured when trying to add shift:', err )
        alert('Error')
    }
  }

  // Update shift
  const updateShift = async(id) => {
    try{
        const response = await axios.put(`${URL}/updateShift/${id}`, shiftData)
        console.log('Shift updated successfully', response.data);
        alert('Shift updated successfully')
        addAction();
        }catch (err){
            console.log('Error occured when trying to update shift:', err )
            alert('Error')
        }
  }
  // Allocate shifts to one of the employees
  const allocateShift = async() => {
    try {
        const response = await axios.put(`${URL}/updateEmployee/${selectedEmployee._id}`, { $push: { shifts: selectedShift } },);
        console.log('Shift pushed successfully:', response.data);
        alert('Shift pushed successfully')
        addAction();
      } catch (err) {
        console.error('Error occurred while push shift:', err);
        alert('error')
      }
}

  return (
    <div>
        <ActionsComp/>
    <Container>
      {/* Page Header */}
      <Box sx={{marginTop: '50px'}} display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h3" fontWeight="bold" sx={{fontFamily: "'Montserrat', sans-serif"}}>Shifts</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModalEdit()}
        >
          Create New Shift
        </Button>
      </Box>

      {/* Shift List Table */}
      <TableContainer  elevation={3} sx={{
        marginTop: '30px',color:'#fff', backgroundColor: '#4DB6AC', borderRadius: '10px',
        overflow: 'hidden',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',transition: 'box-shadow 0.3s ease, transform 0.3s ease'}}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                Date</TableCell>
              <TableCell align= 'left' sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                Start Time</TableCell>
              <TableCell align='left' sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                End Time</TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}
                >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift._id}>
                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}}>
                    {shift.date}</TableCell>
                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align='left'>
                    {shift.startingHour}</TableCell>
                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align='left'>
                    {shift.endingHour}</TableCell>
                    <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModalEdit(shift)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleOpenModalAllocate(shift)}>
                    <PersonAddIcon/>
                  </IconButton>
                </TableCell>
    

              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Shift Modal for Creating/Editing Shifts */}
      <Modal open={openModalEdit} onClose={handleCloseModalEdit}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
            {/* Box modal form */}
          <Typography variant="h6" fontWeight="bold">
            {selectedShift ? 'Edit Shift' : 'Create New Shift'}
          </Typography>
          <TextField label="Date" type="date" name="date" defaultValue={selectedShift?.date || ''} InputLabelProps={{ shrink: true }} onChange={handleChange} required/>
          <TextField label="Start Time" type="time" name='startingHour' defaultValue={selectedShift?.startingHour || ''} InputLabelProps={{ shrink: true }} onChange={handleChange} required />
          <TextField label="End Time" type="time" name='endingHour' defaultValue={selectedShift?.endingHour || ''} InputLabelProps={{ shrink: true }} onChange={handleChange} required />
          <Button variant="contained" color="primary" onClick={selectedShift ? () => updateShift(selectedShift._id) : addShift}>
            {selectedShift ? 'Update Shift' : 'Create Shift'}
          </Button>
        </Box>
      </Modal>

    {/* Allocate employees to shift Modal */}

      <Modal open={openModelAllocate} onClose={handleCloseModalAllocate}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
            {/* Select employee to allocate this shift  */}
            <Typography variant="h6" fontWeight="bold" align="center">
          Allocate to Shift
        </Typography>

        {/* Form Control with Select */}
        <FormControl fullWidth>
          <InputLabel id="select-label">Select Employee</InputLabel>
          <Select
            labelId="select-label"
            value={selectedEmployee}
            onChange={(e) => setSelctedEmployee(e.target.value)}
            label="Select Employee"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#115293',
              },
              '& .MuiSvgIcon-root': {
                color: '#1976d2',
              },
            }}
          >
            {
                notInShiftEmp?.map((emp) => {
                    return <MenuItem key={emp._id} value={emp}>{emp.firstName} {emp.lastName}</MenuItem>
                })
            }

          </Select>
        </FormControl>

        {/* Save/Close Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={allocateShift}
          fullWidth
        >
          Allocate
        </Button>


        </Box>
      </Modal>
    </Container>
    </div>
  );
};

export default ShiftsComp;
