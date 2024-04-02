import { JourneyAddDialog } from '@/components/modules/JourneyAddDialog';
import JourneyBox from '@/components/modules/JourneyBox';
import { P } from '@/components/atoms/P';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/stores/authStore';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getCookie } from '@/apis/cookies';
import { fetchUserProfile, reissueToken } from '@/apis/api/auth';
import { useEffect } from 'react';

function JourneyCollectionPage() {
    const journeyList = useSelector((state) => state.journey);

    const dispatch = useDispatch();

    // 로그인 성공 시 유저 정보를 바탕으로 여정 처음에 가져오는 요청

    const { data, isLoading, error } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUserProfile,
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(authActions.getUserProfile(data.data));
            dispatch(authActions.setAccessToken(getCookie('access_token')));
            dispatch(authActions.setRefreshToken(getCookie('refresh_token')));
        }
    }, [dispatch, isLoading, data]);

    useEffect(() => {
        // 에러가 발생했을 때 처리
        if (error) {
            if (error.response && error.response.status === 401) {
                // access token 만료
                console.log(error.response);
                reissueToken()
                    .then((refreshTokenResponse) => {
                        if (refreshTokenResponse.status === 200) {
                            return fetchUserProfile();
                        } else {
                            throw new Error('Refresh Token expired');
                        }
                    })
                    .then(() => {
                        //setUser(userInfoResponse.data);
                        dispatch(authActions.getUserProfile(data.data));

                        // setToken({
                        //     accessToken: getCookie('access_token'),
                        //     refreshToken: getCookie('refresh_token'),
                        // });
                        dispatch(authActions.setAccessToken(getCookie('access_token')));
                        dispatch(authActions.setRefreshToken(getCookie('refresh_token')));
                    })
                    .catch(() => {
                        console.log('refresh error');
                        // refresh token도 만료 또는 유효하지 않음
                        // 에러 처리
                        throw new Error('Refresh Token expired');
                    });
            }
        }
    }, [error]);

    //console.log(useSelector((state) => state.auth.user));
    //console.log(useSelector((state) => state.auth.accessToken));

    return (
        <>
            <h3>여정 컬렉션 페이지</h3>
            <ul>
                {journeyList &&
                    journeyList.map((journey) => (
                        <li key={journey.journeyId}>
                            <JourneyBox journey={journey} />
                        </li>
                    ))}

                <div className="border border-solid rounded-md flex flex-col  mx-8 my-16 py-10 h-80 p-3 mb-1.5">
                    <P variant="mainHeader" className="my-5">
                        계획된 여정이 없습니다.
                    </P>
                    <P variant="content">완벽한 여행 계획을 위해 여정을 추가해보세요!</P>
                    <JourneyAddDialog />
                </div>
            </ul>
        </>
    );
}

export default JourneyCollectionPage;
