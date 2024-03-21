import React from "react";

function CheckInCounterFlightInfo({flightInfo}) {

    return (
        <>
            <div className="grid grid-cols-2">
                <p>운항사</p>
                <p>{flightInfo.flightNo}</p>
            </div>
            <div className="grid grid-cols-2">
                <p>실제 운항사</p>
                <p>{flightInfo.realFlightNo}</p>
            </div>
            <div className="grid grid-cols-2">
                <p>셀프 체크인 / 백드랍</p>
                {/* 밑에 수정 */}
                <p className="text-red-600">불가능</p>
            </div>

        </>
    )
}

export default CheckInCounterFlightInfo

