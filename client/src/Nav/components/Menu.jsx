import { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { decodeAuthToken } from '../../Auth/Auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const MenuItem = ({ icon, text, to }) => {
  return (
    <ListItem button component={Link} to={to}>
      {icon}
      <ListItemText primary={text} primaryTypographyProps={{ sx: { color: 'grey.600', marginLeft: '8px' } }} />
    </ListItem>
  );
};

const SideMenu = () => {
  const decodedToken = decodeAuthToken();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    window.location.reload(); 
  };

  return (
    <>
      <IconButton onClick={toggleMenu} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleMenu}
        sx={{
          '& .MuiDrawer-paper': {
            minWidth: '250px'
          }
        }}
      >
        <List>
          <ListItem sx={{ color: 'grey.600', justifyContent: 'space-between' }}>
            <ListItemText/>
            <IconButton onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          
          <MenuItem icon={<HomeIcon />} text="Home" to="/" />
          {decodedToken && <MenuItem icon={<FormatListBulletedIcon />} text="Post List" to="/posts" />}
          {decodedToken && <MenuItem icon={<AddIcon />} text="Create New Post" to="/new-post" />}
          <Divider />
          {!decodedToken && <MenuItem icon={<LoginIcon />} text="Login" to="/login" />}
          {!decodedToken && <MenuItem icon={<PersonAddIcon />} text="Register" to="/sign-up" />}
          {decodedToken && <ListItem button onClick={handleLogout}>
                <ExitToAppIcon />
            <ListItemText primary="LogOut" primaryTypographyProps={{ sx: { color: 'grey.600', marginLeft: '8px' } }} />
          </ListItem>}
        </List>
      </Drawer>
    </>
  );
};

export default SideMenu;
