import Stack from '@mui/material/Stack';
import { Box, TextField, Button } from '@mui/material';
import  '../App.css'
import { useState } from 'react';
import axios from 'axios';




function LoginComp(props) {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();


    const URL_AUTH = 'http://localhost:3000/auth/login';
    const userDetails = {username: userName, email: email}

    const submit = async() => {

    try {
        const response = await axios.post(URL_AUTH, userDetails); // Send request to JWT (authController)
        console.log('Response Data:', response.data);
        sessionStorage.name = response.data.name;
        sessionStorage.userId = response.data.id; // From response, take the userID and put it in session storage
        sessionStorage.token = response.data.token; //From response, take the token and put it in session storage
        location.href = `/employees`; // go to employees page
    } catch (error) {
        if(error.status === 400){
            return alert('One or more details are wrong. Please Try again')
        }
        else{
            console.log('Error:' , error.message )
        }
    }
}

  return (  
    
    <div className='login_box'>
    <Box 
      sx={{
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
        width: '100vh', 
        backgroundColor: '#4682B4',
        textAlign: 'center',
        borderRadius: '40px 40px 0 0',
        padding: '20px',

      }} >
        
        <h1 style={{color: '#FFFDD0', fontSize: '2.5rem'}}> Welcome to Our Factory !</h1>
        <Stack sx={{marginTop: '60px'}} spacing={1}>
            <div className='login_inputs' style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '10px', margin: 0 , color: '#FFFDD0'}}>
                    Username:
                </h2>
                <TextField
                    id="outlined-username"
                    label="Please enter your Username"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    InputProps={{
                        style: { color: 'white' } // Set text color to white
                    }}
                    sx={{
                        width: '40vh',
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white' // Set border color to white
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white' // Set focused border color to white
                        },
                        "& .MuiInputLabel-root": {
                            color: 'white' // Set label color to white
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: 'white' // Set focused label color to white
                        }
                    }}
                />
            </div>

            <div className='login_inputs' >
                <h2 style={{ marginRight: '10px', margin: 0, color: '#FFFDD0' }}>
                    Email:
                </h2>
                <TextField
                    id="outlined-email"
                    label="Please enter your Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        style: { color: 'white' } // Set text color to white
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white' // Set border color to white
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white' // Set focused border color to white
                        },
                        "& .MuiInputLabel-root": {
                            color: 'white' // Set label color to white
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: 'white' // Set focused label color to white
                        }
                    }}
                />
            </div>
            <div className='login_inputs'>
            <Button variant="contained" 
            onClick={submit}
            sx={{
                backgroundColor: '#FFFFE0',  // Coral color
                color: '#4682B4',               // Text color
                '&:hover': {
                    backgroundColor: '#FF7F50', // Slightly darker on hover
                },
                padding: '10px 20px', 
                width: '200px',
                marginTop: '30px',  
                borderRadius: '40px'      
            }}>Submit</Button>
            </div>
            </Stack>
      </Box>
    </div>
  )
};

export default LoginComp;
