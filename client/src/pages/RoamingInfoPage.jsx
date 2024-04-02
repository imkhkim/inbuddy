import { useRef, forwardRef } from "react";
import { P } from '@/components/atoms/P';
import SectionLayout from "@/components/modules/SectionLayout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ASDF from '@/assets/maps/T1-3F-배치.svg?react'
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

const RomaingMap = {

}


function RoamingInfoPage() {

    const handleClick = (event) => {
        let targetElement = event.target; // 클릭된 요소

        // 클릭된 요소가 <g> 태그인지 확인
        if (targetElement.nodeName === 'g') {
            console.log('클릭된 <g> 태그의 ID:', targetElement.id);
        } else {
            // <g> 태그를 찾기 위해 상위 요소로 이동
            while (targetElement.parentNode) {
                targetElement = targetElement.parentNode;
                if (targetElement.nodeName === 'g') {
                    console.log('찾은 <g> 태그의 ID:', targetElement.id);
                    break; // <g> 태그를 찾았으므로 반복 종료
                }
            }
        }
    };

    const svgContainerRef = useRef(ASDF)

    const focusOnElement = (selector) => {
        const element = svgContainerRef.current
        console.log(element)
        // }
    };


    return (
        <div className="mx-8 flex flex-col items-center">

            <P variant='mainHeader' className='my-10'>로밍 방법 안내 </P>

            <Tabs defaultValue="T1" className="flex flex-col items-center">
                <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="T1" className="font-pretendardBold">
                        T1
                    </TabsTrigger>
                    <TabsTrigger value="T2" className="font-pretendardBold">
                        T2
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="T1">
                    <div className="flex justify-center mb-3" >
                        <Menubar className="">
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외로밍</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSeparator />
                                    <MenubarItem className="flex flex-col"
                                        onClick={() => focusOnElement("#T1-3F")}>
                                        <P variant="content">KT 로밍센터</P>
                                        <P size="xs">3층 서편 4층 출국장 부근</P>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외유심</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSeparator />
                                    <MenubarItem className="flex flex-col">
                                        <P variant="content">우리은행 환전소</P>
                                        <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">포켓와이파이</MenubarTrigger>
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
                    </div>
                </TabsContent>
                <TabsContent value="T2">
                    <div className="flex justify-center mb-3" >
                        <Menubar className="">
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외로밍</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSeparator />
                                    <MenubarItem className="flex flex-col">
                                        <P variant="content">우리은행 환전소</P>
                                        <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외유심</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSeparator />
                                    <MenubarItem className="flex flex-col">
                                        <P variant="content">우리은행 환전소</P>
                                        <P size="xs">탑승동 3층 121번 게이트 부근</P>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">포켓와이파이</MenubarTrigger>
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
                    </div>

                </TabsContent>
            </Tabs>















            <TransformWrapper
                initialScale={4}
                centerOnInit={true}
                wheel={{
                    step: 1,
                    smoothStep: 0.005,
                }}
            >
                <TransformComponent>
                    <ASDF className='w-full'
                        ref={svgContainerRef} />
                </TransformComponent>
            </TransformWrapper>
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
        </div >
    )
}

export default RoamingInfoPage;