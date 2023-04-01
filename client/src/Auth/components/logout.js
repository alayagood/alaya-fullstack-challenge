import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Button variant="danger" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;
