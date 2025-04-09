import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { API_ENDPOINTS } from '@/constants';

// Async thunks for API calls
export const getParticipantsByEmail = createAsyncThunk(
    'api/getParticipantsByEmail',
    async (email) => {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_TEAMS_BY_EMAIL, {
            params: { email }
        });
        return response.data;
    }
);

export const getParticipantsById = createAsyncThunk(
    'api/getParticipantsById',
    async (id) => {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_PARTICIPANTS_BY_ID, {
            params: { id }
        });
        return response.data;
    }
);

export const postParticipants = createAsyncThunk(
    'api/postParticipants',
    async (data) => {
        const response = await axiosInstance.post(API_ENDPOINTS.POST_PARTICIPANTS, data);
        return response.data;
    }
);

const initialState = {
    loading: false,
    error: null,
    data: null
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearData: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // getParticipantsByEmail
            .addCase(getParticipantsByEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParticipantsByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getParticipantsByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // getParticipantsById
            .addCase(getParticipantsById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParticipantsById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getParticipantsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // postParticipants
            .addCase(postParticipants.pending, (state) => {
                state.loading = true;
            })
            .addCase(postParticipants.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(postParticipants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearError, clearData } = apiSlice.actions;
export default apiSlice.reducer; 