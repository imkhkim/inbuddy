import React from "react";
import { P } from "@/components/atoms/P";
import SectionLayout from "@/components/modules/SectionLayout";

function PassportInfoPage() {
    return (
        <div className="mx-8">
            <P variant='mainHeader' className='my-10'>긴급여권 발급 방법 안내</P>


            <SectionLayout sectionHeaderText='긴급여권이란?' >
                <P variant='content'>긴급한 사유로 인하여 발급하는 비전자여권으로, 전자여권을 발급받을 시간적 여유가 없는 경우에 발급 가능하다.</P>
                <P variant='subHeader'>단수여권, 유효기간 1년</P>
            </SectionLayout>

            <SectionLayout sectionHeaderText='발급대상' >
                <P variant='content'>전자여권을 발급(재발급) 받을 시간적 여유가 없는 경우로서, 여권의 긴급한 발급이 필요하다고 인정되는 경우 신청 가능</P>
            </SectionLayout>
            <SectionLayout sectionHeaderText='기본 구비 서류' >
                <ul className="list-disc list-inside" >
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        긴급여권 발급신청 사유서
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        여권발급신청서 1매
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        여권용 사진 1매 (6개월 이내 촬영사진)
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        신분증
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        가족관계기록사항에 관한 증명서
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        병역관계서류 (해당자)
                    </li>
                </ul>
                <P>필요시 추가 서류를 요청할 수 있음</P>
            </SectionLayout>
            <SectionLayout sectionHeaderText='수수료' >
                <P>53,000원 (미화 53달러)</P>
                <P>친족 사망 또는 위독 관련 증빙서류 제출시 20,000원 (미화 20달러)</P>
                <P>긴급여권발급 신청 후 6개월 이내 증빙서류 제출시 33,000원 환불 가능</P>
            </SectionLayout>
            <SectionLayout sectionHeaderText='접수 및 발급처' >
                {/* 탭 추가 */}
            </SectionLayout>


        </div>
    )
}

export default PassportInfoPage;