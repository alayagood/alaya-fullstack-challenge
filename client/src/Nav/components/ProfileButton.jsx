import { decodeAuthToken } from '../../Auth/Auth';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ProfileButton = () => {
  const decodedToken = decodeAuthToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (decodedToken && decodedToken.email) {
    return (
      <>
        <Button color="inherit">Welcome {decodedToken.email}</Button>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <Button className="text-white" component={Link} to="/login">Login</Button>
    );
  }
};

export default ProfileButton;