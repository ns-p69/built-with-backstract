import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    teamId: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTeamId: (state, action) => {
            state.teamId = action.payload;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetAuth: () => initialState,
    },
});

export const { setTeamId, setAuthenticated, setError, resetAuth } = authSlice.actions;
export default authSlice.reducer; 