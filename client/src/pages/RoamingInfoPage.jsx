import React from "react";
import { P } from '@/components/atoms/P';
import SectionLayout from "@/components/modules/SectionLayout";

function RoamingInfoPage() {
    return (
        <div className="mx-8">

            <P variant='mainHeader' className='my-10'>로밍 방법 안내 </P>

            <SectionLayout sectionHeaderText='로밍 서비스 안내'>
                <P>인천 공항 내 통신 3사 로밍센터 혹은 이용하시는 통신사 어플에서 로밍 요금제를 알아보고 이용하실 수 있습니다.</P>
            </SectionLayout>
            <SectionLayout sectionHeaderText='유심 서비스 안내'>
                <ol>
                    <li>
                        <P>연중무휴 07:00-21:00 운영시간에 인천공항 북스토
                            어 모든 매장에서 수령 및 당일 현장 구매가 가능</P>
                    </li>
                    <li>
                        <P> 마이리얼트립/클룩 예약 고객들은 인천공항 1터미널 면세점 구역 안 30번게이트 맞은편 서점(BOOK & DRINK)에서 수령 가능</P>
                    </li>
                    <li>
                        <P>매일 오전7시~9시까지 인천공항 1터미널 3층 8번 출
                            구 서점은 많이 혼잡하오니 출국심사를 하시고 면세점구역 안 서점을 이용 요망</P>
                    </li>
                </ol>
            </SectionLayout>
            <SectionLayout sectionHeaderText='와이파이 도시락 서비스 안내'>
            </SectionLayout>
        </div>
    )
}

export default RoamingInfoPage;