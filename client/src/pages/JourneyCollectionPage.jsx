import { JourneyAddDialog } from '@/components/modules/JourneyAddDialog';
import JourneyBox from '@/components/modules/JourneyBox';
import { P } from '@/components/atoms/P';
import { testActions } from '@/stores/test';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from '@/stores/authStore';
import { useQuery, useQueries } from '@tanstack/react-query';
import { fetchUserProfile } from '@/apis/api/auth';

function JourneyCollectionPage() {
    // const data = [
    //     {
    //         "journeyId": 3,
    //         "journeyName": "제주도 계획",
    //         "flightCode": "ABC123",
    //         "journeyDone": true,
    //         "journeyCreationDate": "2024-03-20T12:34:18.000+00:00",
    //         "journeyModificationDate": "2024-03-20T12:34:18.000+00:00",
    //         "journeyDate": "23.02.11",
    //     },
    //     {
    //         "journeyId": 5,
    //         "journeyName": "가족이랑 일본",
    //         "flightCode": "DEF123",
    //         "journeyDone": false,
    //         "journeyCreationDate": "2024-03-20T13:00:35.000+00:00",
    //         "journeyModificationDate": "2024-03-20T13:00:35.000+00:00",
    //         "journeyDate": "23.06.14",
    //     }
    // ]

    const journeyList = useSelector((state) => state.journey);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const { data, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUserProfile,
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(authActions.getUserProfile(data.data));
        }
    }, [dispatch, isLoading, data]);

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
