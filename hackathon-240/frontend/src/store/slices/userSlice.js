import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    participants: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetUser: () => initialState,
    },
});

export const { setParticipants, setLoading, setError, resetUser } = userSlice.actions;
export default userSlice.reducer; 