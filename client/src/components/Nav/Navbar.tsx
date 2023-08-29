import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useHistory } from 'react-router-dom';

import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import storageService from '../../services/storage/storageService';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Navbar.css';
import { RootState } from '../../store/types/rootState';
import styled from '@emotion/styled';
import { MenuProps, Menu, MenuItem, Divider } from '@mui/material';

const Navbar: React.FC = (): JSX.Element => {
    const postsStore = useSelector((state: RootState) => state.posts);
    const userStore = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState<boolean>(false);
    const [isUserLogged, setIsUserLogged] = useState<boolean>(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const isUserAuthenticated: string = storageService.get('session', 'isAuthenticated');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
       if(Object.keys(userStore.user).length || !!isUserAuthenticated) {
        setIsUserLogged(true);
       } else {
        setIsUserLogged(false);
       }

    }, [isUserAuthenticated, userStore, postsStore]); 

    const handleLogOut = (): void => {
        
        storageService.clear('local');
        storageService.clear('session');
        dispatch({ type: 'RESET_STATE' });
    
        history.push('/');
        handleDialogClose();
    }

    const handleDialogClickOpen = (): void => {
        setOpen(true);
      };
    
    const handleDialogClose = (): void => {
        setOpen(false);
    };

    //menu
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(() => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          minWidth: 180,
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
            },

          },
        },
      }));

    return (
        <>
        {
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Link to="/">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >                       
                        <HomeIcon />   
                    </IconButton>
                </Link>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    The Victor Blog
                </Typography>
                <div className="main-menu">
                    {
                        isUserLogged 
                         ?
                         <>         
                            <Button
                                id="demo-customized-button"
                                aria-controls={openMenu ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMenu ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                               <PersonIcon /> Hello!, { storageService.get('local', 'userName') }
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} disableRipple>
                                <Link to="/user-posts">
                                    <Button variant="contained" color="secondary">📚 My posts</Button>
                                </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple>
                                <Link to="/add-posts">
                                    <Button variant="contained" color="secondary">📕 Create New</Button>
                                </Link>
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={handleClose} disableRipple>
                                    <Button variant="contained" onClick={handleDialogClickOpen} color="secondary">🚀 Logout</Button>
                                </MenuItem>
                            </StyledMenu>
                            
                         </>
                         : 
                         <>
                            <Link to="/login">
                            <Button variant="contained" color="secondary">👱‍♂️ Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="contained" color="secondary">👨‍💻 Register</Button>
                            </Link>
                        </>
                    }

                </div>
                </Toolbar>
            </AppBar>
            </Box>
        }
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Logout"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to log out?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose}>No</Button>
                <Button onClick={handleLogOut} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default Navbar;
