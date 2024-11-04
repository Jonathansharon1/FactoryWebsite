import { useEffect, useState } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../App.css'
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ActionsComp from "../Actions";
import { useLocation, useNavigate } from 'react-router-dom';


const DepartmentsComp = (props) => {
    const [departments, setDepartments] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [rows, setRows] = useState([]);
    const location = useLocation();
    const userIdDB = location.state;
    const navigate = useNavigate();



    const URL = 'http://localhost:3000/factory';


    //Load all departments
    useEffect(() => {
        async function getDeparments() {
        const {data} = await axios.get(`${URL}/departments`)
        setDepartments(data)
        }
        getDeparments()
    },[])

    // Load all employees
    useEffect(() => {
        async function getEmployees() {
            const { data: employees } = await axios.get(`${URL}/employees`);
            setAllEmployees(employees);
        }
        getEmployees();
    }, []);

        // create data for table rows
        function createData(id, departmentName, managerName, depEmpoloyees) {
            return {id, departmentName, managerName, depEmpoloyees };
        }

    // Create rows for the the table using the data 
    useEffect(() => {
        if (allEmployees.length > 0 && departments.length > 0) { // Ensure both are available
            
            const newRows = departments.map((dep) => {
                // Find manager name by his ID 
                let managerName = allEmployees.find((employee) => employee._id == dep.manager);
                managerName = `${managerName.firstName} ${managerName.lastName}`;
                console.log(managerName)
                // Find all employees in this department
                const depEmpoloyees = allEmployees.filter((employee) => employee.departmentID == dep._id)
                
                return createData(dep._id, dep.name, managerName, depEmpoloyees);
            });
            setRows(newRows);
        }
    }, [allEmployees, departments]); 




  return (
    <div>
    <ActionsComp/>
    <Box sx={{display: 'block', alignItems: 'center', justifyContent: 'center', marginTop:'60px'}}>
    <h1 style={{marginTop: '20px'}}>Factory Departments</h1>
<TableContainer  sx={{backgroundColor: '#FFB6C1', borderRadius: '20px' ,   borderRadius: '8px',overflow: 'hidden',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',}}>
                <Table sx={{ minWidth: 650  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}}>Name</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Manager</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Employees</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", textDecoration: 'none'}} component="th" scope="row">
                                   <Link style={{ color: 'inherit', textDecoration: 'underline' }}  to={"/editDepartment"} state={{id:row.id, userIdDB: userIdDB}}> {row.departmentName}</Link>
                                </TableCell>
                                <TableCell  sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align="center">{row.managerName}</TableCell>
                                <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif"}} align="center">
                                {
                                    row.depEmpoloyees.map((employee) => {
                                        return <li key={employee._id}><Link style={{ color: 'inherit', textDecoration: 'underline' }} to={"/editEmployee"} state={{id: employee._id, userIdDB:userIdDB}}>{employee.firstName} {employee.lastName}</Link></li>
                                    })
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: "flex",alignItems:'center', justifyContent:'center', marginTop: '50px', gap: '10px' }}>   
                <h3> Want to add new department? </h3> 
                <Button onClick={() => { 
                    navigate('/addDepartment', { state: { userIdDB:userIdDB } }) }} sx={{backgroundColor: '#4DB6AC', color: "white", height: '50px', borderRadius: '10px'}} >
                    Click Here
                    </Button>
            </div>
            </Box>
    </div>
  )
};

export default DepartmentsComp;
