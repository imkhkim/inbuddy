import { createSlice } from '@reduxjs/toolkit';

import { getCookie } from '@/apis/cookies';
import { fetchUserProfile, reissueToken, logout } from '@/apis/api/auth';

const initialAuthState = { user: {}, accessToken: '', refreshToken: '' };
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },

        logout(state) {
            console.log('logout');
            const data = logout;
            console.log(data);
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        },

        getUserProfile(state) {
            console.log('get profile');
            try {
                const userInfoResponse = fetchUserProfile;
                state.user = userInfoResponse.data;
                state.accessToken = getCookie('access_token');
                state.refreshToken = getCookie('refresh_token');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // access token 만료
                    console.log(error.response);
                    try {
                        const refreshTokenResponse = reissueToken;
                        if (refreshTokenResponse.status === 200) {
                            // 새로운 accessToken으로 프로필 정보 재요청
                            // http이면 cookie 못 받아옴
                            const userInfoResponse = fetchUserProfile(getCookie('access_token'));
                            state.user = userInfoResponse.data;
                            state.accessToken = getCookie('access_token');
                            state.refreshToken = getCookie('refresh_token');
                        }
                    } catch (refreshError) {
                        console.log('refersh error');
                        // else {
                        // refresh token도 만료 또는 유효하지 않음
                        throw new Error('Refresh Token expired');
                        // }
                        // window.location.href = "/login";
                    }
                } else {
                    // 다른 종류의 오류 처리
                    console.error('요청 실패:', error);
                    throw error;
                }
            }
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
