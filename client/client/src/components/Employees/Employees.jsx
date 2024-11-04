import { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../App.css'
import { Box, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import ActionsComp from "../Actions";



const EmployeesComp = (props) => {
    const [allUsers, setAllUsers] = useState();
    const [userIdDB,setUserIdDB] = useState()
    const [allEmployees, setAllEmployees] = useState([]);
    const [rows, setRows] = useState([]);
    const [departments, setDepartments]  = useState([])
    const [selectDep, setSelectDep] = useState('')
    const [filterEmployees, setFilterEmployees] = useState([])
    const URL = 'http://localhost:3000/factory';
    const navigate = useNavigate();



    // Load token
    useEffect(() => {
        async function fetchDataAuth() {
            const token = sessionStorage.token;
            const resp = await axios.get(URL, {
                headers: {
                    'x-access-token': token
                }
            });
            setAllUsers(resp.data);
        }
        fetchDataAuth();
    }, []);


    // Load user details
        useEffect(() => {
             async function getUserDetails() {
                const id = sessionStorage.userId;
                const respActions = await axios.get(`${URL}/user/${id}`);
                setUserIdDB(respActions.data.id)
                }
                getUserDetails();
            }, []);



// Load all employees
    useEffect(() => {
        async function getEmployees() {
            const { data: employees } = await axios.get(`${URL}/employees`);
            setAllEmployees(employees);
        }
        getEmployees();
    }, []);

    // create data for table rows
    function createData(id, fullName, department, shifts) {
        return {id, fullName, department, shifts };
    }

    // Get All departments
    useEffect(() => {
        async function fetchDepartments() {
            const {data} = await axios.get(`${URL}/departments`);
            setDepartments(data)
            console.log(departments)
        }
        fetchDepartments()
    },[])



    // Create rows for the the table using the data 
    useEffect(() => {
        if (allEmployees.length > 0 && departments.length > 0) { // Ensure both are available
            
            const newRows = (selectDep == '' ? allEmployees : filterEmployees).map((employee) => {
                const fullName = `${employee.firstName} ${employee.lastName}`;
                
                // Find the department name based on employee's departmentID
                const department = departments.find((dep) => dep._id === employee.departmentID);
                const departmentName = department ? department.name : 'Unknown';
                return createData(employee._id, fullName, departmentName, employee.shifts);
            });
            setRows(newRows);
        }
    }, [allEmployees, departments,filterEmployees, selectDep]); 
    
    // Filter the employees by Department's user input
    useEffect(() => {
        if(selectDep != ''){
        setFilterEmployees(allEmployees.filter((employee) => employee.departmentID == selectDep))
        }
    }, [selectDep])

    useEffect(() => {
        const addAction = async() => {
        if(selectDep != ''){
            // newAction - all the data that will add to the json file
            //redirected - check in the server(userService) if we need to logout
            const {data} = await axios.get(`${URL}/addAction/${userIdDB}`);
            if ( data.newAction.actionsAllowed <= 0 || data.redirected){
                alert('You have been redirected due to inactivity')
                navigate('/')
                sessionStorage.removeItem('token');
            }

        }
    }
        addAction()
    }, [selectDep])

   

    return (
        <div>
            <ActionsComp/>
            <Box sx={{display: 'block', alignItems: 'center', justifyContent: 'center', marginTop:'60px'}}>
            <h1 style={{marginTop: '20px'}}>Factory Employees</h1>

        <Box sx={{ maxWidth: 250 ,position: "relative", left: '40%', marginBottom: '20px'}}>
            <FormControl fullWidth>
                <InputLabel  id="simple-select-label">Search By Department</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setSelectDep(e.target.value)}
                label="Department"
                value={selectDep}
                >
                    <MenuItem value={''}>All</MenuItem>
                {
                    departments?.map((dep) => {
                        return <MenuItem key={dep.id} value={dep._id}>{dep.name}</MenuItem>
                    })
                }
                
                </Select>
            </FormControl>
            </Box>

            <TableContainer  sx={{backgroundColor: '#6A8DFF', borderRadius: '20px', borderRadius: '10px',overflow: 'hidden',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',transition: 'box-shadow 0.3s ease, transform 0.3s ease',}}>
                <Table sx={{ minWidth: 650  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}}>Name</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Department</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Shifts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", textDecoration: 'none'}} component="th" scope="row">
                                   <Link style={{ color: 'inherit', textDecoration: 'underline' }} to={"/editEmployee"} state={{id: row.id, userId: userIdDB}}> {row.fullName}</Link>
                                </TableCell>
                                <TableCell  sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align="center">{row.department}</TableCell>
                                <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif"}} align="center">
                                {
                                    row.shifts.map((shift,index) => {
                                        return <li key={index}>{shift.date}, {shift.startingHour} - {shift.endingHour}</li>
                                    })
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: "flex",alignItems:'center', justifyContent:'center', marginTop: '50px', gap: '10px' }}>   
                <h3> Want to add new employee? </h3> 
                <Button onClick={() => { 
                    navigate('/addEmployee', { state: { userIdDB:userIdDB } }) }}
                      sx={{backgroundColor: '#4DB6AC', color: "white", height: '50px', borderRadius: '10px'}}>
                    Click Here
                    </Button>
            </div>
            </Box>
        </div>

    );
};

export default EmployeesComp;
