import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from '@/stores/authStore';
import { useQuery, useQueries } from '@tanstack/react-query';
import { fetchUserProfile } from '@/apis/api/auth';

function JourneyCollectionPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const { data, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUserProfile,
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    try {
        useEffect(() => {
            if (!isLoading && data) {
                dispatch(authActions.getUserProfile(data.data));
            }
        }, [dispatch, isLoading, data]);
        console.log(user);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // access token 만료
            console.log(error.response);
            try {
                const refreshTokenResponse = await reissueToken();
                if (refreshTokenResponse.status === 200) {
                    // 새로운 accessToken으로 프로필 정보 재요청
                    // http이면 cookie 못 받아옴
                    const userInfoResponse = await fetchUserProfile(
                        getCookie('access_token')
                    );
                    setUser(userInfoResponse.data);
                    setToken({
                        accessToken: getCookie('access_token'),
                        refreshToken: getCookie('refresh_token'),
                    });
                }
            } catch (refreshError) {
                console.log('refersh error');
                // else {
                // refresh token도 만료 또는 유효하지 않음
                throw new Error('Refresh Token expired');
                // }
                // window.location.href = "/login";
            }
        }


    return (
        <>
            <h3>여정 컬렉션 페이지</h3>
        </>
    );
}

export default JourneyCollectionPage;
