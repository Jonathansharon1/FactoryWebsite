import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ActionsComp = (props) => {
    const actionsURL = 'http://localhost:3000/factory/user';
    const [userIdDB,setUserId] = useState()
    const [activeName, setActiveName] = useState();
        // Load user details
        useEffect(() => {
            async function getUserDetails() {
                const id = sessionStorage.userId;
                const respActions = await axios.get(`${actionsURL}/${id}`);
                setUserId(respActions.data.id)
                setActiveName(respActions.data.name);
            }
            getUserDetails();
        }, []);
  return (
    <div className="navbar">
  
                    <h4 style={{maxWidth: '200px', minWidth: '100px'}}>
                            Hello, {activeName}
                        </h4>

    <Box sx={{ zIndex: 1,marginLeft: '150px', width: '70%', textAlign: 'center', display: 'flex', alignItems: 'center' 
        , justifyContent: 'space-around'}}>
       <Link style={{color:'#6A8DFF', textDecoration: 'none'}} state={userIdDB} to={"/employees"}>Employees </Link>
        <Link style={{color:'#6A8DFF', textDecoration: 'none'}} state={userIdDB} to={"/departments"} >Departments</Link>
        <Link style={{color:'#6A8DFF', textDecoration: 'none'}} state={userIdDB} to={"/shifts"} >Shifts</Link>
        <Link style={{color:'#6A8DFF', textDecoration: 'none'}} state={userIdDB} to={"/users"}>Users</Link>
    
    </Box>
    </div>
  )
};

export default ActionsComp;
