import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { loginAPI } from '~/api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('duongnnfx21064@funix.edu.vn');
  const [password, setPassword] = useState('123456789');
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const loginHandle = async () => {
    try {
      const response = await loginAPI(email, password);

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('currentUser', response.user);
      
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem('expiration', expiration.toISOString());

      return navigate('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (accessToken) {
      return navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <>
      {
        !accessToken &&
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
          <Typography variant="h3" style={{ textAlign: 'center', fontWeight: 'bold' }}>Admin</Typography>
          <TextField type="text" label="email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <TextField type="password" label="password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <Button variant="contained" size="large" onClick={loginHandle}>Login</Button>
        </Box>
      }
    </>
  );
};

export default Login;