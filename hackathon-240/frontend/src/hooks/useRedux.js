import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as authActions from '@/store/slices/authSlice';
import * as userActions from '@/store/slices/userSlice';
import * as challengeActions from '@/store/slices/challengeSlice';
import * as apiActions from '@/store/slices/apiSlice';

export const useRedux = () => {
    const dispatch = useDispatch();

    const state = {
        auth: useSelector((state) => state.auth),
        user: useSelector((state) => state.user),
        challenge: useSelector((state) => state.challenge),
        api: useSelector((state) => state.api)
    };

    const actions = {
        auth: bindActionCreators(authActions, dispatch),
        user: bindActionCreators(userActions, dispatch),
        challenge: bindActionCreators(challengeActions, dispatch),
        api: bindActionCreators(apiActions, dispatch)
    };

    return { state, actions };
}; 