import PropTypes from 'prop-types';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import { NavLinks } from './Enums/NavBar';
import Navbar from './Nav/components/Navbar';
import NotFoundPage from './NotFoundPage';
import AuthRedirect from './Auth/components/AuthRedirect';
import Login from './Auth/components/Login'; 
import SignupForm from './Auth/components/SingupForm';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';

const theme = createTheme ({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    const location = useLocation(); 
     return (
      <ThemeProvider theme={theme}>            
        <div className="w-100">
            <Provider store={props.store}>   
            <Box style={{padding:'15px', marginBottom:'15px'}}>
                <Navbar activeSection={location.pathname} />
            </Box>         
            <AuthRedirect
                activeSection={location.pathname}
                loginRoute={NavLinks.LOGIN}
                registerRoute={NavLinks.SIGN_UP}
                defaultRoute="/"
            />
            <Routes>  
                <Route path="/" exact element={<PostListPage showAddPost={false}/>}></Route>
                <Route path={NavLinks.LOGIN} exact element={<Login />}></Route>                     
                <Route path={NavLinks.SIGN_UP} exact element={<SignupForm />} />
                <Route path={NavLinks.POSTS} exact element={<PostListPage showAddPost={false}/>} />
                <Route path={NavLinks.NEW_POST} exact element={<PostListPage showAddPost={true}/>} />
                <Route path="/posts/:cuid/:slug" exact element={<PostDetailPage />} />  
                <Route path="*" element={<NotFoundPage />} />             
            </Routes>            
            </Provider>              
        </div>
      </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;