import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import { useEffect } from 'react';
import { tokenLoader, getTokenDuration } from '~/utils/auth';
import { logoutAPI } from '~/api/auth';

const RootLayout = () => {
  const token = tokenLoader();
  const navigate = useNavigate();
  
  
  const logoutHandle = async () => {
    await logoutAPI();
    navigate('/login');
  }

  useEffect(() => {
    if(!token){
      return;
    }

    if(token === 'EXPIRED'){
      logoutHandle();
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      logoutHandle();
    }, tokenDuration)
  }, [token, logoutHandle]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10} sx={{ padding: '30px' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RootLayout;