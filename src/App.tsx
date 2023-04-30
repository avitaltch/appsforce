import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/userSlice';
import { RootState } from './store';
import UserList from './components/UserList';

function App() {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <UserList users={users} />
    </div>
  );
}

export default App
