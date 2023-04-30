
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    location: string;
}

interface UserState {
    users: User[];
}

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
    },
});

export const { setUsers } = userSlice.actions;

export const fetchUsers = () => dispatch => {
    axios.get('https://randomuser.me/api/?results=10')
    .then(response => {
        const users = response.data.results.map(user => ({
            id: user.login.uuid,
            name: `${user.name.title} ${user.name.first} ${user.name.last}`,
            email: user.email,
            image: user.picture.medium,
            location: `${user.location.country} ${user.location.city} ${user.location.street}`
        }));
        dispatch(setUsers(users));
    })
    .catch(error => {
        console.error(error);
    });
};