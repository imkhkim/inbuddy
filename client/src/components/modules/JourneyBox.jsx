import { P } from '@/components/atoms/P';
import FlightBox from './FlightBox';
import PropTypes from 'prop-types';
import FlightDialog from './FlightDialog';
import Stamp from '@/assets/stamp.png';

JourneyBox.propTypes = {
    journey: PropTypes.object.isRequired,
};

function JourneyBox({ journey }) {
    // 박스 공통 레이아웃
    const commonClassName =
        'rounded-md flex flex-col mx-8 my-10 py-10 h-80 p-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-center w-[80%]';

    // 과거 여정 박스에만 적용되는 스타일 (ex: 완료 스탬프 추가)
    const pastJourneystyle = {
        backgroundImage: `url(${Stamp})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <>
            <div className={commonClassName} style={journey.journeyDone ? pastJourneystyle : null}>
                <P variant="mainHeader" className="my-4">
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
