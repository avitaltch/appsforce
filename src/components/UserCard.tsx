import { Avatar, Card, CardContent, Typography, TextField, CardActions, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { User } from '../store/userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface UserCardProps {
    user: User;
    onClose: () => void;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ user, onClose }) => {
    const [editedUser, setEditedUser] = useState<User>({ ...user });
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedUser({
        ...editedUser,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleSaveClick = () => {
        dispatch(updateUser(editedUser));
      onClose();
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {`${user.name.title} ${user.name.first} ${user.name.last}`}
          </Typography>
          <TextField
            name="email"
            label="Email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <TextField
            name="location.street"
            label="Street"
            value={editedUser.location.street}
            onChange={handleInputChange}
          />
          {/* Add more input fields for other user properties */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSaveClick}>
            Save
          </Button>
          <Button size="small" onClick={onClose}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
  };

  export default UserCard;