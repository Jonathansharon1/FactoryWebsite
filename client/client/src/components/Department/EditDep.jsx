import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button, Container,  Box , Divider} from '@mui/material';
import axios from "axios";
import ActionsComp from "../Actions";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EditDepComp = (props) => {
    const location = useLocation();
    const departmentId = location.state.id;
    const userIdDB = location.state.userIdDB;
    console.log(userIdDB)
    const [depEmployees, setDepEmployees] = useState([]);
    const [notDepEmployees, setNotDepEmployees] = useState([])
    const [depData, setDepData] = useState({
        name: '',
        manager: '', 
      });
    const URL = 'http://localhost:3000/factory';
    const [selectedEmp, setSelectedEmp] = useState()
    const navigate = useNavigate();

    
    
    


      // Get department data by the id
  useEffect(() => {
    const getDepartmentById = async () => {
      try {
        const { data: dep } = await axios.get(`${URL}/department/${departmentId}`);
        setDepData({
            name: dep.name,
            manager: dep.manager
        });
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };
    getDepartmentById();
  }, [departmentId]);


    // Load all employees, and filter only department employees
      useEffect(() => {
        async function getEmployees() {
            const { data: employees } = await axios.get(`${URL}/employees`);
            setDepEmployees(employees.filter((employee) => employee.departmentID == departmentId))
            // Make a list of all the employees that are not in this department
            setNotDepEmployees(employees.filter((employee) => employee.departmentID != departmentId))
            
        }
        getEmployees();
    }, [depData]);
        

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepData((prev) => ({ ...prev, [name]: value }));
  };

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

  

    // Update department
    const updateDep = async () => {
        try {
          const response = await axios.put(`${URL}/updateDepartment/${departmentId}`, depData);
          console.log('Department updated successfully:', response.data);
          alert('Department updated successfully')
          addAction();
        } catch (err) {
          console.error('Error occurred while updating Department:', err);
          alert('error')
        }
      };

    // Delete - it will delete the departments and all the employees that are in this department
  const deleteDep = async() => {
    try {
        const response = await axios.delete(`${URL}/deleteDepartment/${departmentId}`)
        depEmployees.map(async(emp) => {
            try {
                console.log(emp)
                const response = await axios.delete(`${URL}/deleteEmployee/${emp._id}`)
                console.log('Employee deleted successfully:', response.data)
            } catch(err) {
                console.log('Error occurred while deleting employee:' , err)
            }
        })
        console.log('Department deleted successfully:', response.data)
        alert("The department and all the employees in it have been delete")
        addAction();
    } catch(err) {
        console.log('Error occurred while deleting employee:' , err)
    }
  }

  const employeeMoveDep = async() => {
    console.log(selectedEmp)
    console.log(departmentId)
    try {
        const response = await axios.put(`${URL}/updateEmployee/${selectedEmp._id}`, {departmentID: departmentId });
        console.log('Employee updated successfully:', response.data);
        alert('Employee updated successfully')
        addAction();
      } catch (err) {
        console.error('Error occurred while updating employee:', err);
        alert('error')
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
            {depData.name}'s Details & Shifts
            </h2>
          <TextField
            label="Department Name"
            name="name"
            variant="outlined"
            value={depData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="ManagerId"
            name="manager"
            variant="outlined"
            value={depData.manager}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px',marginBottom:'20px', gap: '10px'}}>
          <Button  onClick={updateDep} variant="contained" color="primary" fullWidth>
            Save
          </Button>
          <Button sx={{backgroundColor: '#ff4d4f'}} onClick={deleteDep} variant="contained" fullWidth>
                        Delete
          </Button>
          </div>

          <Divider />
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px', marginBottom: '20px'}}>
            <h3> Allocate other employees to <label style={{fontWeight: 'bold', fontSize:'1.3rem'}}>
                {depData.name}'s </label> department</h3>
            <Box sx={{ width: 350 }}>
            <FormControl fullWidth>
                <InputLabel  id="simple-select-label">Choose Employee</InputLabel>
                <Select
                onChange={(e) => setSelectedEmp(e.target.value)}
                label="Choose employee"
                value={selectedEmp}
                >
                {
                    notDepEmployees?.map((emp) => {
                        return <MenuItem key={emp._id} value={emp}> {emp.firstName} {emp.lastName}</MenuItem>
                    })
                }
                
                </Select>
            </FormControl>
            </Box>         
            <Button onClick={employeeMoveDep} variant="contained" color="primary">Add</Button> 
            </div>
          </Box>
          </Container>

          
    </div>
  )
};

export default EditDepComp;
