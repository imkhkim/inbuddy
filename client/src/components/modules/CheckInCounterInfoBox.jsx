import React from "react";

function CheckInCounterInfoBox({flightInfo}) {




    return (

        <div className="w-full h-36 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center text-xl">
            <div className="flex items-center">
                <p className="font-bold text-3xl px-2" >{flightInfo.flightNo}</p>
                <p>편 체크인 카운터는</p>
            </div>
            <div className="flex">
                <p>제</p>
                <p className="font-bold text-3xl px-2" >{flightInfo.terminalNo}</p>
                <p>여객터미널의</p>
            </div>
            <div className="flex">
                <p className="font-bold text-3xl px-2" >{flightInfo.checkinCounter}</p>
                <p>입니다.</p>
            </div>

        </div>

    
        
    
    )
}


export default CheckInCounterInfoBox;