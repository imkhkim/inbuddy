import React from 'react';
import T1 from '@/assets/maps/T1-3F_Test.svg';
import Map from '@/components/atoms/Map';
import CheckInCounterInfo from '@/components/modules/CheckInCounterInfo';
import { P } from '@/components/atoms/P';
import { Button } from '@/components/atoms/Button';
import { Div } from '@/components/atoms/Div';

function CheckInCounterInfoPage() {
    // 티켓 정보에 따라 달라지는 svg파일
    const svgFile = T1;

    return (
        <div className="w-96">
            <P variant="mainHeader">체크인 카운터 안내</P>

            <Map svgFile={svgFile}></Map>

            <CheckInCounterInfo />

            <a href="">
                <P variant="content" color="ming" className="text-center text-[17px]">
                    혹시 다른 터미널에 계신가요?
                </P>
                <P>하이</P>
                <Button variant="destructive">asdf</Button>
                <P>디폴트입니다.</P>
                <P variant="mainHeader">메인헤더입니다.</P>
                <P variant="sectionHeader">섹션헤더입니다.</P>
            </a>
            <div>
                <h1>실제 운항사란?</h1>
                <p>공동운항 여부에 따라 어쩌꾸저쩌구</p>
            </div>
        </div>
    );
}

export default CheckInCounterInfoPage;
