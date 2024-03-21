import React from "react";
import { P } from "@/components/atoms/P";
import SectionLayout from "@/components/modules/SectionLayout";

function ExchangeInfoPage() {
    return (
        <div className="mx-8">
            <P variant='mainHeader' className='my-10'>환전 방법 안내</P>

            {/* 탭 추가 */}


            <SectionLayout sectionHeaderText='환전 준비물' >
                <ul className="list-disc list-inside">
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        신분증 (여권 등)
                    </li>
                    <li className="text-text-black font-pretendardBold text-base py-1">
                        현금 또는 입출금 가능한 당행의 카드
                    </li>
                </ul>
            </SectionLayout>

            <SectionLayout sectionHeaderText='공항 환전 시 유의사항' >
                <ol className="list-decimal list-inside">
                    <li className="text-sm font-pretendardRegular text-text-black py-1">
                        공항 환전소는 공항 영업점이라는 특수성으로 인해 일반 은행의 영업점보다 환전 수수료가 높을 수 있습니다.
                    </li>
                    <li className="text-sm font-pretendardRegular text-text-black py-1">
                        1일 최대 환전 한도는 한화 100만원 까지 입니다.
                    </li>
                    <li className="text-sm font-pretendardRegular text-text-black py-1">
                        본인의 주거래은행이 아닌 환전소에서는 현금 환전만 가능하므로 사전에 ATM에서 현금 인출 후 거래하시거나 환전 ATM 기기를 이용하시기 바랍니다.
                    </li>
                </ol>
            </SectionLayout>
        </div>
    )
}

export default ExchangeInfoPage;