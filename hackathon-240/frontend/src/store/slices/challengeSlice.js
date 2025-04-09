import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Fetch team details to get challenge_id
export const fetchTeamDetails = createAsyncThunk(
    'challenge/fetchTeamDetails',
    async (teamId) => {
        const response = await axiosInstance.get(`/teams/id`, {
            params: { id: teamId }
        });
        return response.data.teams_one;
    }
);

// Fetch challenge details
export const fetchChallengeDetails = createAsyncThunk(
    'challenge/fetchChallengeDetails',
    async (challengeId) => {
        const response = await axiosInstance.get(`/challenges/id`, {
            params: { id: challengeId }
        });
        return response.data.challenges_one;
    }
);

const initialState = {
    teamDetails: null,
    challengeDetails: null,
    status: 'idle',
    error: null,
    challengeStartTime: null,
    timeLimit: null
};

const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        setChallengeDetails: (state, action) => {
            state.challengeDetails = action.payload;
        },
        startChallenge: (state) => {
            localStorage.setItem('hackathonStarted', 'true');
        },
        resetChallenge: (state) => {
            state.challengeStartTime = null;
            localStorage.removeItem('challengeStartTime');
            localStorage.removeItem('timeLimit');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTeamDetails.fulfilled, (state, action) => {
                state.teamDetails = action.payload;
                // Don't set status to succeeded yet, wait for challenge details
            })
            .addCase(fetchTeamDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchChallengeDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchChallengeDetails.fulfilled, (state, action) => {
                state.challengeDetails = action.payload;
                state.timeLimit = action.payload.time_limit;
                localStorage.setItem('timeLimit', action.payload.time_limit);
                localStorage.setItem('challengeDetails', JSON.stringify(action.payload));
                state.status = 'succeeded';
            })
            .addCase(fetchChallengeDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setChallengeDetails, startChallenge, resetChallenge } = challengeSlice.actions;
export default challengeSlice.reducer; 