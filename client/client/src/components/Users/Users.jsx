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
import ActionsComp from "../Actions";





const UsersComp = (props) => {

    const URL = 'http://localhost:3000/factory';
    const [allUsers, setAllUsers] = useState([]);

    // Load Users from DB
    useEffect(() => {
        const getUsers = async() => {
            const {data} = await axios.get(`${URL}/users`);
            console.log(data
            )
            setAllUsers(data)
        }
        getUsers()
    },[])






  return (
    <div>
              <div>
            <ActionsComp/>
            <Box sx={{display: 'block', alignItems: 'center', justifyContent: 'center', marginTop:'60px'}}>
            <h1 style={{marginTop: '20px'}}>Website Users</h1>

            <TableContainer  sx={{backgroundColor: '#6A8DFF', borderRadius: '20px', borderRadius: '10px',overflow: 'hidden',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',transition: 'box-shadow 0.3s ease, transform 0.3s ease',}}>
                <Table sx={{ minWidth: 650  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}}>Name</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Max Actions</TableCell>
                            <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize:'1.2rem'}} align="center">Current Actions Allowed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user) => (
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} component="th" scope="row">
                                    {user.fullName}
                                </TableCell>
                                <TableCell  
                                sx={{color: '#fff', fontFamily: "'Montserrat', sans-serif"}} align="center">
                                    {user.numOfActions}
                                    </TableCell>
                                <TableCell sx={{color: '#fff',fontFamily: "'Montserrat', sans-serif"}} align="center">
                                    5
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
 
            </Box>
        </div>
    </div>
  )
};

export default UsersComp;
