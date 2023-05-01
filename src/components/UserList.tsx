import { Grid } from '@mui/material';
import { User, nameToString } from '../types';
import { useState } from 'react';
import UserModal from './UserModal';
import UserCard from './UserCard';
import { Fab, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { v4 as uuidv4 } from 'uuid';
interface UserListProps {
    users: User[];
}

const AddButton = styled(Fab) `
    position: fixed !important;
    right: 2%;
    top: 2%;
    z-index: 9;
`



const UserList: React.FC<UserListProps> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [nameFilter, setNameFilter] = useState<string>('');
    const dispatch = useDispatch();

    const handleNewUserClick = () => {
        const user: User = {
            id: uuidv4(),
            email: '',
            image: '',
            location: {
                streetName: '',
                streetNumber: '',
                city: '',
                country: ''
            },
            name: {
                title: '',
                first: 'New',
                last: 'User'
            },
        };
        dispatch(addUser(user));
        setSelectedUser(user);
    }

    const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        // Works bad because of grid sizing, 1 result is invisible. Works good in a list instead of a grid.
        return nameToString(user.name).toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1
    });
    

    return (
        <>
            <TextField
                id="input-with-icon-textfield"
                label="Filter by Name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                onChange={handleNameFilterChange}
                variant="standard"
                sx={{ marginBottom: '2rem' }}
                // Additional filters can be added to the map, due to time restraints, only implemented Name.
            />
            <Grid container spacing={12} columnSpacing={12}>
                {filteredUsers.map((user) => (
                    <Grid key={user.id} item xs={12} sm={12} md={6} lg={4}>
                        <UserCard user={user} setSelectedUser={setSelectedUser}/>
                    </Grid>
                ))}
                {selectedUser && (
                    <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
                )}
            </Grid>
            <AddButton color="primary" aria-label="add" onClick={handleNewUserClick}>
                <AddIcon />
            </AddButton>
        </>
    );
};
            
export default UserList;