import { P } from '@/components/atoms/P';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';

import Map from '@/components/atoms/Map';
import SectionLayout from '@/components/modules/SectionLayout';

import T13FPassportInfo from '@/assets/maps/T1-3F-passport-info.svg';
import T22FPassportInfo from '@/assets/maps/T2-2F-passport-info.svg';

function PassportInfoPage() {
    const T13F = T13FPassportInfo;
    const T22F = T22FPassportInfo;

    return (
        <>
            <P variant="mainHeader" className="mt-4">
                긴급여권 발급 방법 안내
            </P>
            <div className="p-4">
                <SectionLayout sectionHeaderText="긴급여권이란?">
                    <P variant="content" size="sm" className="leading-relaxed">
                        긴급한 사유로 인하여 발급하는 비전자여권으로, 전자여권을 발급받을 시간적 여유가 없는 경우에 발급
                        가능하다.
                    </P>
                    <P variant="default" color="neutral">
                        단수여권, 유효기간 1년
                    </P>
                </SectionLayout>

                <SectionLayout sectionHeaderText="발급대상">
                    <P variant="content" size="sm" className="leading-relaxed">
                        전자여권을 발급(재발급) 받을 시간적 여유가 없는 경우로서, 여권의 긴급한 발급이 필요하다고
                        인정되는 경우 신청 가능
                    </P>
                </SectionLayout>
                <SectionLayout sectionHeaderText="기본 구비 서류">
                    <ul className="list-disc list-inside">
                        <li className="py-1 text-base text-text-black font-pretendardBold">긴급여권 발급신청 사유서</li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">여권발급신청서 1매</li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">
                            여권용 사진 1매 (6개월 이내 촬영사진)
                        </li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">신분증</li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">
                            가족관계기록사항에 관한 증명서
                        </li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">병역관계서류 (해당자)</li>
                    </ul>
                    <P variant="default" color="neutral">
                        ※ 필요 시 추가 서류를 요청할 수 있음
                    </P>
                </SectionLayout>
                <SectionLayout sectionHeaderText="수수료">
                    <P variant="content">53,000원 (미화 53달러)</P>
                    <P variant="content" size="sm" className="leading-relaxed">
                        * 친족 사망 또는 위독 관련 증빙서류 제출시 20,000원 (미화 20달러)
                    </P>
                    <P variant="default" color="neutral" size="xs" className="leading-relaxed">
                        ※ 긴급여권발급 신청 후 6개월 이내 증빙서류 제출시 33,000원 환불 가능
                    </P>
                </SectionLayout>
                <SectionLayout sectionHeaderText="접수 및 발급처">
                    <Tabs defaultValue="T1">
                        <TabsList>
                            <TabsTrigger value="T1" className="font-pretendardBold">
                                T1
                            </TabsTrigger>
                            <TabsTrigger value="T2" className="font-pretendardBold">
                                T2
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="T1">
                            <P variant="content" className="mb-2">
                                인천 공항 내 여권 민원실(T1)
                            </P>
                            <div className="grid grid-cols-3 grid-rows-3 mb-2 gap-y-1">
                                <P variant="content" size="sm">
                                    운영시간
                                </P>
                                <P className="col-span-2">09:00 ~ 18:00 (월~일요일 정상운영, 법정공휴일 휴무)</P>
                                <P variant="content" size="sm">
                                    위치
                                </P>
                                <P className="col-span-2">제1여객터미널 3층 일반지역 G 체크인카운터 부근</P>
                                <P variant="content" size="sm">
                                    연락처
                                </P>
                                <P className="col-span-2">032-740-2777~8</P>
                            </div>
                            <div className="bg-[#284350]">
                                <img src={T13FPassportInfo} alt="T13FPassportInfo Map" />
                            </div>
                            {/* <Map svgFile={T13F}></Map> */}
                        </TabsContent>
                        <TabsContent value="T2">
                            <P variant="content" className="mb-2">
                                인천 공항 내 여권 민원실(T2)
                            </P>
                            <div className="grid grid-cols-3 grid-rows-3 mb-2 gap-y-1">
                                <P variant="content" size="sm">
                                    운영시간
                                </P>
                                <P className="col-span-2">09:00 ~ 18:00 (연중무휴)</P>
                                <P variant="content" size="sm">
                                    위치
                                </P>
                                <P className="col-span-2">제2여객터미널 2층 중앙 정부종합행정센터 내</P>
                                <P variant="content" size="sm">
                                    연락처
                                </P>
                                <P className="col-span-2">032-740-2782~3</P>
                            </div>
                            <div className="bg-[#284350]">
                                <img src={T22FPassportInfo} alt="T22FPassportInfo Map" />
                            </div>
                            {/* <Map svgFile={T22F}></Map> */}
                        </TabsContent>
                    </Tabs>
                </SectionLayout>
            </div>
        </>
    );
}

export default PassportInfoPage;
