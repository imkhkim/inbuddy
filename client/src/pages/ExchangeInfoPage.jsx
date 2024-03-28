import { P } from '@/components/atoms/P';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/atoms/Menubar';

import SectionLayout from '@/components/modules/SectionLayout';

function ExchangeInfoPage() {
    return (
        <div className="mx-8">
            <P variant="mainHeader" className="my-10">
                환전 방법 안내
            </P>

            <Tabs defaultValue="T1" className="text-center">
                <TabsList>
                    <TabsTrigger value="T1" className="font-pretendardBold">
                        T1
                    </TabsTrigger>
                    <TabsTrigger value="T2" className="font-pretendardBold">
                        T2
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="T1">
                    <Menubar className="w-40 mx-auto">
                        <MenubarMenu>
                            <MenubarTrigger>면세지역</MenubarTrigger>
                            <MenubarContent>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">3층 면세지역 25번 게이트 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 1층 수하물수취지역 E 입국장 안</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 면세지역 29번 게이트 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>일반지역</MenubarTrigger>
                            <MenubarContent>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">국민은행 환전소</P>
                                    <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">국민은행 환전소</P>
                                    <P size="xs">제1여객터미널 1층 일반지역 9번 출입구 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">국민은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 5번출국장 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">국민은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 3번 출국장 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">제1여객터미널 지하1층 동편</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">제1여객터미널 1층 일반지역 4번 출입구 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 11번 출입구 부근</P>
                                </MenubarItem>
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">우리은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 J, K 체크인카운터 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 지하 1층 교통센터</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 1층 일반지역 11번 출입구 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 D,E 체크인카운터 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="flex flex-col">
                                    <P variant="content">하나은행 환전소</P>
                                    <P size="xs">제1여객터미널 3층 일반지역 4번 출입구 부근</P>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <P variant="content">우리은행 환전소</P>
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Search the web</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>Find...</MenubarItem>
                                        <MenubarItem>Find Next</MenubarItem>
                                        <MenubarItem>Find Previous</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <P variant="content">하나은행 환전소</P>
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Search the web</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>Find...</MenubarItem>
                                        <MenubarItem>Find Next</MenubarItem>
                                        <MenubarItem>Find Previous</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </TabsContent>
                <TabsContent value="T2">dd</TabsContent>
            </Tabs>

            <SectionLayout sectionHeaderText="환전 준비물">
                <ul className="list-disc list-inside">
                    <li className="py-1 text-base text-text-black font-pretendardBold">신분증 (여권 등)</li>
                    <li className="py-1 text-base text-text-black font-pretendardBold">
                        현금 또는 입출금 가능한 당행의 카드
                    </li>
                </ul>
            </SectionLayout>

            <SectionLayout sectionHeaderText="공항 환전 시 유의사항">
                <ol className="list-decimal list-inside">
                    <li className="py-1 text-sm font-pretendardRegular text-text-black">
                        공항 환전소는 공항 영업점이라는 특수성으로 인해 일반 은행의 영업점보다 환전 수수료가 높을 수
                        있습니다.
                    </li>
                    <li className="py-1 text-sm font-pretendardRegular text-text-black">
                        1일 최대 환전 한도는 한화 100만원 까지 입니다.
                    </li>
                    <li className="py-1 text-sm font-pretendardRegular text-text-black">
                        본인의 주거래은행이 아닌 환전소에서는 현금 환전만 가능하므로 사전에 ATM에서 현금 인출 후
                        거래하시거나 환전 ATM 기기를 이용하시기 바랍니다.
                    </li>
                </ol>
            </SectionLayout>
        </div>
    );
}

export default ExchangeInfoPage;
