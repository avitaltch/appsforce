import { IconButton, Stack, Divider, Avatar, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User, nameToString, locationToString } from '../types';
import styled from 'styled-components';
import { deleteUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import DeleteUserDialog from './DeleteUserDialog';
import { useState } from 'react';

interface UserCardProps {
    user: User;
    setSelectedUser?: any;
}

const UserCardWrapper = styled(Card)`
  && {
    height: 100%;
    box-shadow: 0 0 5px #fff;
    filter: drop-shadow(0 0 0.2em #646cffaa);
    transition: all .3s ease-in-out;
    &:hover {
      transform: translateY(-3px);
      filter: drop-shadow(0 0 0.3em #61dafbaa);
    }
  }
`;

const UserCard: React.FC<UserCardProps> = ({ user, setSelectedUser }) => {
    const dispatch = useDispatch();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleDeleteClick = (user: User) => {
        dispatch(deleteUser(user));
    };

    
    
    return (
        <>
            <UserCardWrapper sx={{ height: '100%', borderRadius: '2rem' }}>
                <CardContent>
                        <Avatar src={user.image} alt={nameToString(user.name)} sx={{ width: 64, height: 64, margin: '1rem auto' }} />
                        <Typography variant="h6" component="div">{nameToString(user.name)}</Typography>
                        <Divider sx={{ m: 2 }} />
                        <Typography variant="body2" color="text.primary">{user.email}</Typography>
                        <Typography variant="body2" color="text.secondary">{locationToString(user.location)}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', marginBottom: '1rem' }}>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<EditIcon /> } onClick={() => handleEditClick(user)}>
                            <Typography variant="body1" color="text.primary">Edit Profile</Typography>
                        </Button>
                        <IconButton aria-label="delete" onClick={() => setDeleteDialogOpen(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </CardActions>
            </UserCardWrapper>
            { deleteDialogOpen ?
                <DeleteUserDialog
                    onClose={() => {setDeleteDialogOpen(false);}}
                    onConfirm={() => {handleDeleteClick(user); setDeleteDialogOpen(false);}}
                    user={user}
            /> : null}
        </>
    );
};
            
export default UserCard;