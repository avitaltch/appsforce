
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from '../types';



const initialState: UserState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        updateUser(state, action: PayloadAction<User>) {
            const { id } = action.payload;
            const userIndex = state.users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.users[userIndex] = action.payload;
            }
        },
        deleteUser(state, action: PayloadAction<User>) {
            const { id } = action.payload;
            const updatedUsers = state.users.filter(user => user.id !== id);
            state.users = updatedUsers;
        },
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
    }
});

export const { setUsers, updateUser, deleteUser, addUser } = userSlice.actions;

export const fetchUsers = () => (dispatch) => {
    axios.get('https://randomuser.me/api/?results=10')
    .then(response => {
        const users: User[] = response.data.results.map((user) => ({
            id: user.login.uuid,
            name: { title: user.name.title, first: user.name.first, last: user.name.last },
            email: user.email,
            image: user.picture.medium,
            location: { country: user.location.country, city: user.location.city, streetName: user.location.street.name, streetNumber: user.location.street.number }
        }));
        dispatch(setUsers(users));
    })
    .catch(error => {
        console.error(error);
    });
};