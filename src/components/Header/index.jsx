import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ModeSelect from '../ModeToggle/ModeSelect';
import Notification from './Menu/Notification';
import Profile from './Menu/Profile';

const Header = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: (theme) => theme.cssCustom.heightHeader,
      width: '100%',
      borderBottom: '1px solid rgba(189, 195, 199,1.0)',
      overflowX: 'auto'
    }}>
      <Box>
        <Typography
          variant="span"
          px={5}
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: '20px',
          }}>
          Admin
        </Typography>
      </Box>
      <Box px={5} sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeSelect />
        <Notification />
        <Profile />
      </Box>
    </Box>
  );
};

export default Header;