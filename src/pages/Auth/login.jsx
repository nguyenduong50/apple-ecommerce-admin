import { useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { loginAPI } from '~/api/auth';

const Login = () => {
  const [username, setUserName] = useState('duong@gmail.com');
  const [password, setPassword] = useState('123456789')

  const loginHandle = async() => {
    try {
      const response = await loginAPI(username, password);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>  
      <Box
        component="form"
        sx={{
          width: '20%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}     
        autoComplete="off"
      >
        <Typography variant="h3" style={{textAlign: 'center', fontWeight: 'bold'}}>Admin</Typography>
        <TextField type="text" label="username" variant="outlined" value={username} onChange={(event) => setUserName(event.target.value)} required />
        <TextField type="password" label="password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <Button variant="contained" onClick={loginHandle}>Login</Button>
      </Box>
    </>
  );
};

export default Login;