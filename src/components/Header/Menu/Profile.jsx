import {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import defaultAvatar from '~/assets/images/users/default-avatar.png';
import { logoutAPI } from '~/api/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isOpenMenuProfile, setIsOpenMenuProfile] = useState(null);
  const open = Boolean(isOpenMenuProfile);
  const navigate = useNavigate();

  const handleClickMenuProfile = (event) => {
    setIsOpenMenuProfile(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setIsOpenMenuProfile(null);
  };

  const logoutHandle = async() => {
    await logoutAPI();
    setIsOpenMenuProfile(null);
    navigate('/login');
  }

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClickMenuProfile}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} alt="avatar" src={defaultAvatar} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={isOpenMenuProfile}
        id="account-menu"
        open={open}
        onClose={handleCloseMenuProfile}
        onClick={handleCloseMenuProfile}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMenuProfile}>
          <Avatar /> {JSON.parse(localStorage.getItem('currentUser')).name || ''}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenuProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutHandle}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;