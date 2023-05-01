import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/userSlice';
import { RootState } from './store';
import UserList from './components/UserList';
import { Grid } from '@mui/material'

function App() {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <div className="UserList">
        <UserList users={users} />
      </div>
      <div className="Content">
        {/* Add content on the right side here */}
      </div>
    </Grid>
  );
}

export default App
