import { P } from '@/components/atoms/P';
import FlightBox from './FlightBox';
import PropTypes from 'prop-types';
import FlightDialog from './FlightDialog';
import Stamp from '@/assets/stamp.png';

import { useSelector } from 'react-redux';

JourneyBox.propTypes = {
    journey: PropTypes.object.isRequired,
};

function JourneyBox({ journey }) {
    const flightInfoList = useSelector((state) => state.flightInfo);
    console.log(flightInfoList);
    // 여정 id 번호 저장.. 같은거 flightInfoLIst 와 journeyLIst비교해서 해당 인자에 넣어주기

    // 박스 공통 레이아웃
    const commonClassName = 'border border-solid rounded-md mx-8 my-16 py-10 h-80 p-3 mb-1.5';

    // 과거 여정 박스에만 적용되는 스타일 (ex: 완료 스탬프 추가)
    const pastJourneystyle = {
        backgroundImage: `url(${Stamp})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <>
            <div className={commonClassName} style={journey.journeyDone ? pastJourneystyle : null}>
                <P variant="mainHeader" className="my-5">
                    {journey.journeyName}
                </P>

                {journey.flightInfo ? (
                    <FlightBox flightInfo={journey.flightInfo} />
                ) : (
                    <FlightDialog journeyId={journey.journeyId} />
                )}
            </div>
        </>
    );
}

export default JourneyBox;
