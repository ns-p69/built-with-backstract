import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import challengeReducer from './slices/challengeSlice';
import apiReducer from './slices/apiSlice';
import participantsReducer from './slices/participantsSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    challenge: challengeReducer,
    api: apiReducer,
    participants: participantsReducer
});

export default rootReducer; 