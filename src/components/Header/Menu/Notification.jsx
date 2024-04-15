import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

const Notification = () => {

  return (
    <>
      <Tooltip title="Notification" arrow>
        <Badge color="primary" variant="dot" sx={{ cursor: 'pointer' }}>
          <NotificationsIcon color="action" />
        </Badge>
      </Tooltip>
    </>
  );
};

export default Notification;