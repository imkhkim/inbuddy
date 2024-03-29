import { P } from "@/components/atoms/P";
import airplane from "@/assets/airplane.svg"
import PropTypes from 'prop-types'


FlightBox.propTypes = {
    flightCode: PropTypes.string.isRequired,
    journeyDate: PropTypes.any
};

function FlightBox({ flightCode, journeyDate }) {

    // 코드를 가지고 항공편 조회

    const flightInfo = {
        "flightCode": "ABC123",
        "departureAirportIATA": "ICN",
        "arrivalAirportIATA": "NRT",
        "flightTime": "3h 50m",
        "departureTime": "13:20",
        "arrivalTime": "15:20",
        "departureAirportName": "ICN",
        "arrivalAirportName": "NRT",
    }


    return (
        <>
            <P className='text-center'>{journeyDate}</P>

            <div className="flex flex-row mx-5">
                <div className="text-center">
                    <P className='text-sm text-gray-400'>서울/인천</P>
                    <P className='text-5xl font-pretendardBold'>ICN</P>
                    <P>{flightInfo.departureTime}</P>
                </div>

                <div className="flex flex-col justify-center text-center">
                    <img src={airplane} />
                    <P>{flightInfo.flightTime}</P>
                </div>

                <div className="text-center">
                    <P className='text-sm text-gray-400'>{flightInfo.arrivalAirportName}</P>
                    <P className='text-5xl font-pretendardBold'>{flightInfo.arrivalAirportIATA}</P>
                    <P>{flightInfo.arrivalTime}</P>
                </div>
            </div>
        </>
    )
}

export default FlightBox;


