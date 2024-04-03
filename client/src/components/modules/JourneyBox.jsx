import { P } from '@/components/atoms/P';
import FlightBox from './FlightBox';
import PropTypes from 'prop-types';
import FlightDialog from './FlightDialog';
import Stamp from '@/assets/stamp.png';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getflightInfo, getMyFlight } from '@/apis/api/flightInfo';
import { useEffect, useState } from 'react';
import { journeyActions } from '@/stores/journeyStore';

JourneyBox.propTypes = {
    journey: PropTypes.object.isRequired,
};

// TODO: dummy data
let flightInfo = {
    departureDate: '',
    flightCode: '',
    departureAirportIATA: 'ICN',
    arrivalAirportIATA: '',
    flightTime: '',
    departureTime: {
        timeZone: 'UTC+09:00',
        time: '',
    },
    arrivalTime: {
        timeZone: 'UTC+09:00',
        time: '',
    },
    departureAirportName: '인천',
    arrivalAirportName: '',
};

function JourneyBox({ journey }) {
    const dispatch = useDispatch();

    // const flightInfoList = useSelector((state) => state.flightInfo);
    // const journeyList = useSelector((state) => state.journey);
    //console.log(journey);
    console.log('map 내부', journey.journeyId);
    // const [hasFlightInfo, setHasFlightInfo] = useState(false);

    // console.log(flightInfoList);
    // console.log(journeyList);

    const getFlightInfoQuery = useQuery({
        queryKey: ['getFlightInfo', journey.journeyId],
        queryFn: () => getflightInfo(journey.journeyId),
    });

    const getMyFlightQuery = useQuery({
        queryKey: ['myFlight', journey.journeyId],
        queryFn: () =>
            getMyFlight(
                getFlightInfoQuery.data.data.departureDate,
                getFlightInfoQuery.data.data.airline,
                getFlightInfoQuery.data.data.flightCode
            ),
    });

    console.log(getFlightInfoQuery.data);

    useEffect(() => {
        if (getFlightInfoQuery.data && getFlightInfoQuery.data.data) {
            // && getMyFlightQuery.data
            // setHasFlightInfo(true);
            // 여기서 flightInfo 객체 내부 바꿔주기
            const newFlightInfo = {
                journeyId: journey.journeyId,
                ...getFlightInfoQuery.data.data,
            };
            console.log(newFlightInfo);

            flightInfo = {
                departureDate: getFlightInfoQuery.data.data.departureDate,
                flightCode: getFlightInfoQuery.data.data.airline + getFlightInfoQuery.data.data.flightCode,
                departureAirportIATA: 'ICN',
                arrivalAirportIATA: 'xxx',
                flightTime: 'xxx',
                departureTime: {
                    timeZone: 'UTC+09:00',
                    time: 'xxx',
                },
                arrivalTime: {
                    timeZone: 'UTC+09:00',
                    time: 'xxx',
                },
                departureAirportName: '인천',
                arrivalAirportName: 'xxx',
            };
            console.log('flightInfo', flightInfo);

            dispatch(journeyActions.initialJourney(newFlightInfo));
            dispatch(journeyActions.setJourney(newFlightInfo));
        }
    }, [getFlightInfoQuery.data]);

    // 박스 공통 레이아웃
    const commonClassName =
        'rounded-md flex flex-col mx-8 my-10 py-10 h-80 p-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-center w-[80%]';

    // 과거 여정 박스에만 적용되는 스타일 (ex: 완료 스탬프 추가)
    const pastJourneystyle = {
        backgroundImage: `url(${Stamp})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const handleJourneyClick = () => {
        localStorage.setItem('selectedJourneyId', journey.journeyId); // localStorage에 journeyId 저장
        navigate('/checklist'); // useNavigate를 사용하여 CheckListPage로 이동
    };

    return (
        <>
            <div
                className={commonClassName}
                style={journey.journeyDone ? pastJourneystyle : null}
                onClick={handleJourneyClick}
            >
                <P variant="mainHeader" className="my-4">
                    {journey.journeyName}
                </P>
                {/* 여기서 내가 지금 가진 journey.id를 쏴. api로.
                    그럼 journey.id에 등록된 항공편 정보가 들어오겠지.
                    그럼 그 정보를 journey.flightInfo에 담아.
                    이러면 journey.id에 등록된 항공편 정보가 없었다면 null이나 뭐 다른게 반환될꺼고
                    그러면 등록해달라는 버튼이 나오면 되는거고 // 정보가 있으면 해당하는
                    정보 보여주면 됨 journey.flightInfo*/}
                {getFlightInfoQuery.data && getFlightInfoQuery.data.data ? (
                    <FlightBox flightInfo={flightInfo} />
                ) : (
                    <FlightDialog journeyId={journey.journeyId} />
                )}
            </div>
        </>
    );
}

export default JourneyBox;
