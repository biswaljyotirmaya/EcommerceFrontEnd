import { createSlice } from '@reduxjs/toolkit';


const storedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
    user: storedAuth?.user || {
        name: '',
        email: '',
        password: '',
        retypePassword: '',
        role: '',
        address: {
            city: '',
            state: '',
            country: ''
        }
    },
    loggedIn: storedAuth?.loggedIn || false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload;
            localStorage.setItem("auth", JSON.stringify({
                loggedIn: true,
                user: action.payload
            }));
        },

        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
            localStorage.removeItem("auth");
        },

    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
