import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/Card';
import { Div } from '@/components/atoms/Div';
import FlightBox from '@/components/modules/FlightBox';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import cloudImg from '@/assets/cloud-img.svg';

import { useState } from 'react';
import { P } from '@/components/atoms/P';
import { Separator } from '@/components/atoms/Separator';
import { Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

import clearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg';
import partlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg';
import celsius from '@bybas/weather-icons/design/fill/animation-ready/celsius.svg';

import AirportTimeInfo from '@/components/modules/AirportTimeInfo';

// TODO: dummy data
const flightInfo = {
    departureDate: '2024-03-08',
    flightCode: 'TW213',
    departureAirportIATA: 'ICN',
    arrivalAirportIATA: 'NRT',
    flightTime: '2h 30m',
    departureTime: {
        timeZone: 'UTC+09:00',
        time: '10:20',
    },
    arrivalTime: {
        timeZone: 'UTC+09:00',
        time: '12:50',
    },
    departureAirportName: '인천',
    arrivalAirportName: '도쿄/나리타',
};

const StatusCode = Object.freeze({
    정상: { text: '정상', ready: '탑승 준비', color: 'success-400' },
    지연: { text: '지연', ready: '탑승 지연', color: 'warning-400' },
    결항: { text: '결항', ready: '탑승 취소', color: 'error-400' },
});

function FlightTicketInfoPage() {
    const [status, setStatus] = useState(StatusCode.정상);
    const [boardingGate, setBoardingGate] = useState('-');

    return (
        <>
            <div
                className="flex flex-col items-center justify-end w-full"
                style={{
                    backgroundImage: `url(${cloudImg})`,
                    backgroundPosition: '70% 0%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="mt-10 w-[90%]">
                    <Card className={`bg-${status.color} mx-2 my-2 shadow-xl border-none rounded-2xl`}>
                        <CardHeader className="relative flex flex-col h-12">
                            <Div
                                className="absolute w-32 transform -translate-x-1/2 bg-white border border-black -translate-y-1/4 -top-1/4 left-1/2"
                                size="sm"
                            >
                                <InformationCircleIcon className="w-4 h-4" />
                                <p className="px-2">{status.ready}</p>
                            </Div>
                        </CardHeader>
                        <CardContent className="items-center px-4 py-4 my-2 bg-white">
                            {/* TODO : flighInfo */}
                            <FlightBox flightInfo={flightInfo} />
                            <div className="flex flex-col">
                                <div className="flex justify-around ">
                                    <div className="flex flex-col w-1/2 mx-3 my-2">
                                        <Separator className="my-2" />
                                        <P variant="content" font="regular" size="sm" color="neutral">
                                            탑승구
                                        </P>
                                        <div className="flex flex-col py-1">
                                            {/* TODO : 탑승구 boardingGate  */}
                                            <P variant="content" size="xl" className="text-center " font="regular">
                                                {boardingGate}
                                            </P>
                                            {boardingGate !== '-' && (
                                                <P
                                                    variant="content"
                                                    size="sm"
                                                    className="text-center underline"
                                                    font="regular"
                                                    color="neutral"
                                                >
                                                    <Link>위치 확인</Link>
                                                </P>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-1/2 mx-3 my-2">
                                        <Separator className="my-2" />

                                        <P variant="content" font="regular" size="sm" color="neutral">
                                            좌석 번호
                                        </P>
                                        <div className="flex flex-col py-1">
                                            {/* TODO : 좌석 번호  */}
                                            <P variant="content" size="xl" className="text-center " font="regular">
                                                21A
                                            </P>
                                            <P
                                                variant="content"
                                                size="sm"
                                                className="text-center underline"
                                                font="regular"
                                                color="neutral"
                                            >
                                                <Link>위치 확인</Link>
                                            </P>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex flex-col w-1/2 mx-3 my-2">
                                        <Separator className="my-2" />
                                        <P variant="content" font="regular" size="sm" color="neutral">
                                            예정된 출발 시간
                                        </P>
                                        {/* TODO : 예정 출발 시간  */}
                                        <P variant="content" size="xl" className="py-1 text-center" font="regular">
                                            21:30
                                        </P>
                                    </div>
                                    <div className="flex flex-col w-1/2 mx-3 my-2">
                                        <Separator className="my-2" />
                                        <P variant="content" font="regular" size="sm" color="neutral">
                                            상태
                                        </P>
                                        <div className="py-1 text-xl text-center">
                                            <div className="flex items-center justify-center">
                                                <Circle className={`fill-${status.color}`} color={status.color} />
                                                <p className="px-3">{status.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="h-12"></CardFooter>
                    </Card>
                </div>
            </div>
            <Card className="border-none shadow-none ">
                <CardContent className="flex flex-col items-center justify-center p-0 mx-4 my-2 bg-white ">
                    <div className="my-2 ">
                        <P font="bold" size="xl" className="mb-2">
                            서울/인천
                        </P>
                        <div className="flex items-start justify-between gap-2 -mx-1 ">
                            <div className="mx-1 my-1 ">
                                <AirportTimeInfo code={'ICN'}></AirportTimeInfo>
                            </div>
                            <div className="flex items-center ">
                                <div>
                                    {/* TODO : 날씨 이미지 */}
                                    {/* 참고 https://basmilius.github.io/weather-icons/index-fill.html */}
                                    <img src={clearDay} alt="clearDay" width="90px" />
                                </div>
                                <div className="flex items-center">
                                    {/* TODO: 기온 */}
                                    <P size="5xl">3</P>
                                    <img src={celsius} alt="celsius" width="60px" className="self-end -m-3 " />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 ">
                        {/* TODO : 현지 공항 이름 */}
                        <P font="bold" size="xl" className="mb-2 ">
                            {flightInfo.arrivalAirportName}
                        </P>
                        <div className="flex items-start justify-between gap-2 -mx-1">
                            <div className="mx-1 my-1 ">
                                {/* TODO: 현지  공항 코드로 현지 시각 정보 계산 */}
                                <AirportTimeInfo code={flightInfo.arrivalAirportIATA}></AirportTimeInfo>
                            </div>
                            <div className="flex items-center ">
                                <div>
                                    {/* TODO : 날씨 이미지 */}
                                    {/* 참고 https://basmilius.github.io/weather-icons/index-fill.html */}
                                    <img src={partlyCloudyDay} alt="partlyCloudyDay" width="90px" />
                                </div>
                                <div className="flex items-center">
                                    {/* TODO: 기온 */}
                                    <P size="5xl">5</P>
                                    <img src={celsius} alt="celsius" width="60px" className="self-end -m-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default FlightTicketInfoPage;
