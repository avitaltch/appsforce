import { Alert, Modal, Grid, Card, CardContent, Typography, TextField, CardActions, Button, CardHeader, IconButton, Divider } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { updateUser } from '../store/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { User, nameToString } from '../types';
import { RootState } from '../store';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModalWrapper = styled(Card)`
&& {
  min-width: 320px;
  max-width: 600px;
  width: 100%;
  margin: auto;
  margin-top: 2rem;
  border-radius: 2rem;
}
`;

const UserFieldWrapper = styled.div`
&& {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
}
`

const UserModalHeader = styled(CardHeader)`
  margin: 1rem 1rem 0;
`;

const UserInputsWrapper = styled(Grid)`

`

const UserModalContent = styled(CardContent)`
&& {
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

const UserModalImage = styled.img`
width: 50px;
height: auto;
border-radius: 100%;
margin: 0 auto 2rem;
`;

const UserModalActions = styled(CardActions)`
&& {
  justify-content: center;
  margin-bottom: 1rem;
}
`;

const UserModalCloseButton = styled(IconButton)`
`;

const UserTextField = styled(TextField)`
  margin: 0 1rem;
`

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  const users = useSelector((state: RootState) => state.user.users);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const isEmailUnique = (email: string) => {
    const result = !users.some(user => user.id !== editedUser.id && user.email === email);
    if(!result) {
      setError("Email is not unqiue");
    }
    return result;
  };

  const isNameValid = (): boolean => {
    const { first, last, title } = editedUser.name;
    const isTitleValid = !title || isFieldLongEnough(title, 2);
    const isFirstValid = isFieldLongEnough(first, 3);
    const isLastValid = isFieldLongEnough(last, 3);
    const result = isTitleValid && isFirstValid && isLastValid;

    if(!result) {
      setError('First name and last name must contain at least 3 characters.')
    }

    return result;
  }

  const isFieldLongEnough = (field: string, minLength: number): boolean => {
    return field.length >= minLength;
  }

  const isEmailValid = () => {
    const isEmailValidFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editedUser.email);
    if(!isEmailValidFormat) {
      setError('Email format is not valid.');
    }
    return isEmailValidFormat && isEmailUnique(editedUser.email);
  }

  const isLocationFilled = (): boolean => {
    const { country, city, streetName } = editedUser.location;
    return (isFieldLongEnough(country, 3) && isFieldLongEnough(city, 2) && isFieldLongEnough(streetName, 1));
  };

  const validateUser = (): boolean => {
     return  isNameValid() && isEmailValid() && isLocationFilled();
    
  } 
  
  // Can be user for other changes, however currently it only serves email.
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value)
    setEditedUser({
      ...editedUser,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({
      ...editedUser,
      name: {
        ...editedUser.name,
        [event.target.name.split('.')[1]]: event.target.value
      }
    });
  };
  
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({
      ...editedUser,
      location: {
        ...editedUser.location,
        [event.target.name.split('.')[1]]: event.target.value
      }
    });
  }; 
  
  const handleSaveClick = () => {
    if(validateUser()) {
      dispatch(updateUser(editedUser));
      onClose();
    }
  };
  
  return (
    <Modal open={true} onClose={onClose}>
    <UserModalWrapper>
      <UserModalHeader title="User Information" action={<UserModalCloseButton onClick={onClose}><Close /></UserModalCloseButton>} />
    <UserModalContent>
      { error && <Alert severity="error" sx={{ width: '100%', marginBottom: '1rem' }}>{ error }</Alert> }
      <UserModalImage src={user.image} alt={`${nameToString(user.name)}`} />
      <UserInputsWrapper>
        <UserFieldWrapper>
          <UserTextField
            name="name.title"
            label="Title"
            value={editedUser.name.title}
            onChange={handleNameChange}
            variant="standard"
            sx={{ maxWidth: '4rem'}}
          />
          <UserTextField
            name="name.first"
            label="First Name"
            value={editedUser.name.first}
            onChange={handleNameChange}
            variant="standard"
          />
          <UserTextField
            name="name.last"
            label="Last Name"
            value={editedUser.name.last}
            onChange={handleNameChange}
            variant="standard"
          />
        </UserFieldWrapper>
        <UserFieldWrapper>
          <UserTextField
            name="location.country"
            label="Country"
            value={editedUser.location.country}
            onChange={handleLocationChange}
            variant="standard"
          />
          <UserTextField
            name="location.city"
            label="City"
            value={editedUser.location.city}
            onChange={handleLocationChange}
            variant="standard"
          />
          <Divider />
        </UserFieldWrapper>
        <UserFieldWrapper>
          <UserTextField
            name="location.streetName"
            label="Street"
            value={editedUser.location.streetName}
            onChange={handleLocationChange}
            variant="standard"
          />
          <UserTextField
            name="location.streetNumber"
            label="Number"
            value={editedUser.location.streetNumber}
            onChange={handleLocationChange}
            variant="standard"
          />
        </UserFieldWrapper>
        <UserFieldWrapper style={{ width: '100%' }}>
          <UserTextField
            name="email"
            label="Email"
            value={editedUser.email}
            onChange={handleEmailChange}
            variant="standard"
            sx={{ width: '100%' }}
          />
        </UserFieldWrapper>
      </UserInputsWrapper>
      
      <Typography variant='body2'>ID: {editedUser.id}</Typography>
    </UserModalContent>
      <UserModalActions>
        <Button onClick={handleSaveClick} variant="contained" color="primary">Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </UserModalActions>
    </UserModalWrapper>
    </Modal>
    );
  };
  
  
  export default UserModal;