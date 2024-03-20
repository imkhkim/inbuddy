import React from "react";
import CheckInCounterInfoBox from "../CheckInCounterInfoBox";
import CheckInCounterFlightInfo from "./CheckInCounterFlightInfo";

function CheckInCounterInfo() {


    // 해당 항공편이 어디 터미널인지 로직 설정
    // 1. 해당 항공편이 공동 운항편인지 확인
    //     1-1. 공동 운항편이면 마스터 항공편 검색하여 realFlightNo 에 코드명 할당
    //     1-2. 공동 운항편이 아니면 마스터이기 때문에 해당 항공편 realFlightNo 에 코드명 할당

    // 2. 해당 항공편의 앞자리 두자리 코드명(PK)으로 항공사 db 검색 => KE로 검색 
    // 3. 해당 항공편의 터미널 정보 가져오기
    // 4. 해당 항공편의 체크인 카운터 정보 가져오기


    // 임의설정
    const flightInfo = {
        flightNo: 'KE5869',
        realFlightNo: 'MU2044',
        terminalNo: '1',
        checkinCounter: 'F01-F18',
    }


    return (
        <>
            <CheckInCounterInfoBox flightInfo={flightInfo} />
            <CheckInCounterFlightInfo flightInfo={flightInfo} />
        </>
    )
}


export default CheckInCounterInfo