import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Async thunk for fetching participants
export const fetchParticipants = createAsyncThunk(
    'participants/fetchParticipants',
    async (teamId) => {
        const response = await axiosInstance.post('/participants/team_id', {
            team_id: teamId
        });
        return response.data.participants;
    }
);

const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        participants: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {
        clearParticipants: (state) => {
            state.participants = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchParticipants.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchParticipants.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.participants = action.payload;
                state.error = null;
            })
            .addCase(fetchParticipants.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { clearParticipants } = participantsSlice.actions;
export default participantsSlice.reducer; 