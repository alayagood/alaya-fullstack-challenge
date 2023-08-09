import { Toolbar, AppBar, Typography, Box } from '@mui/material';
import { useMatch, Link } from 'react-router-dom';
import Menu from './Menu';
import ProfileButton from './ProfileButton';
import { getLinkText } from '../../util/helpers';
import Logo from './../../logo.svg';

function Navbar({ activeSection }) {
  const path = useMatch(activeSection);

  return (
    <AppBar position="static" className="text-white">
      <Toolbar>
        <Menu />
        <Box display="flex" alignItems="center" width="100%">
          <Box display="flex" alignItems="center">
            <img src={Logo} alt="Logo" style={{ width: '45px', marginRight: '10px' }} />
            <Typography variant="h6">
              <Link href={path.pathname} className="text-white">
                Alaya Full Stack Challange | {getLinkText(path)}
              </Link>
            </Typography>
          </Box>
          <Box marginLeft="auto">
            <ProfileButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
