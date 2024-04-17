import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

const RootLayout = () => {

  return (
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
  );
};

export default RootLayout;