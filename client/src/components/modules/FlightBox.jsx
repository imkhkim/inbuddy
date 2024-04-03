import { P } from '@/components/atoms/P';
import airplane from '@/assets/airplane.svg';
import PropTypes from 'prop-types';

FlightBox.propTypes = {
    flightInfo: PropTypes.object.isRequired,
};

function FlightBox({ flightInfo }) {
    // 코드를 가지고 항공편 조회

    // {
    //     "departureDate": "2024-03-08",
    //     "flightCode": "TW213",
    //     "departureAirportIATA": "ICN",
    //     "arrivalAirportIATA": "NRT",
    //     "flightTime": "2h 30m",
    //     "departureTime": {
    //         "timeZone": "UTC+09:00",
    //         "time": "10:20"
    //     },
    //     "arrivalTime": {
    //         "timeZone": "UTC+09:00",
    //         "time": "12:50"
    //     },
    //     "departureAirportName": "인천",
    //     "arrivalAirportName": "도쿄/나리타"
    // }

    return (
        <>
            <P className="text-center">{flightInfo.departureDate}</P>

            <div className="flex flex-row justify-center mx-5">
                <div className="text-center">
                    <P className="text-sm text-gray-400">서울/인천</P>
                    <P className="text-5xl font-pretendardBold">ICN</P>
                    <P>{flightInfo.departureTime.time}</P>
                </div>

                <div className="flex flex-col justify-center text-center">
                    <img src={airplane} />
                    <P>{flightInfo.flightTime}</P>
                </div>

                <div className="text-center">
                    <P className="text-sm text-gray-400">..</P>
                    <P className="text-5xl font-pretendardBold">..</P>
                    <P>..</P>
                    {/* <P className="text-sm text-gray-400">{flightInfo.arrivalAirportName}</P>
                    <P className="text-5xl font-pretendardBold">{flightInfo.arrivalAirportIATA}</P>
                    <P>{flightInfo.arrivalTime.time}</P> */}
                </div>
            </div>
        </>
    );
}

export default FlightBox;
