import { Modal, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { User } from '../store/userSlice';
import { useState } from 'react';
import UserCard from './UserCard'

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const handleListItemClick = (user: User) => {
        setSelectedUser(user);
    };
    return (<>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {users.map(user => (
            <ListItem
                key={user.id}
                sx={{ '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' } }}
                onClick={() => handleListItemClick(user)}
            >
                <ListItemAvatar>
                    <Avatar src={user.image} alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="location">
                        <LocationOnIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ))}
        </List>
        {selectedUser && (
            <Modal open={true} onClose={() => setSelectedUser(null)}>
                <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />
            </Modal>
            )}
        </>
    );
};
            
export default UserList;