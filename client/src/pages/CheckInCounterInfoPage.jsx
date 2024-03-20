import React from "react";
import T1 from '@/static/map/T1-3F_Test.svg'
import Map from "@/components/atoms/Map";
import CheckInCounterInfo from "@/components/modules/CheckInCounterInfo";
import { P } from "@/components/atoms/p";
import { Button } from "@/components/atoms/button";


function CheckInCounterInfoPage() {

    // 티켓 정보에 따라 달라지는 svg파일
    const svgFile = T1;


    return (
        <div className="w-96">
            <P color='text-header-mainHeader' size='3xl' font='bold' className='text-center py-4 my-4'>체크인 카운터 안내</P>
            <Map svgFile={svgFile}></Map>
            <CheckInCounterInfo />
            <a href="">
                <P variant='mainHeader' size='3xl'>혹시 다른 터미널에 계신가요?</P>
                <P>하이</P>
                <Button variant='destructive'>asdf</Button>
            </a>
            <div>
                <h1>실제 운항사란?</h1>
                <p>공동운항 여부에 따라 어쩌꾸저쩌구</p>
            </div>
        </div>

    )
}

export default CheckInCounterInfoPage;