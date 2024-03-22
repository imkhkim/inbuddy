import React, { useState, useRef } from 'react';
import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Input } from '@/components/atoms/input';
import IconAndP from '@/components/modules/IconAndP';
import ToggleSupply from '@/components/modules/ToggleSupply';

import pointerIcon from '@/assets/icons/pointer.svg';

function CheckListPage() {
    const [progress, setProgress] = React.useState(13);
    const [divs, setDivs] = useState([]); // div들을 관리할 배열 상태 변수
    const [showInput, setShowInput] = useState(false); // input 상태 변수 생성

    const inputRef = useRef(null);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleShowInput = () => {
        setShowInput(true);
    };

    const handleHideInput = () => {
        setShowInput(false);
    };

    // const handleDivClick = (index) => {
    //     const newDivs = [...divs]; // 기존 div 배열 복사
    //     console.log(newDivs[index]);
    //     console.log('체크리스트 페이지');
    // };

    const handleAddDiv = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue !== '') {
            // 입력 값이 비어있지 않을 경우에만 실행
            const newDivs = [...divs]; // 기존 div 배열 복사
            newDivs.push(<ToggleSupply selected={false} supply={inputValue} />); // 새로운 div 추가
            setDivs(newDivs); // div 배열 업데이트
            inputRef.current.value = ''; // 입력 값 초기화
        }
    };

    const handleRemoveDiv = () => {
        if (divs.length > 0) {
            const newDivs = [...divs]; // 기존 div들을 복사
            newDivs.pop(); // 마지막 div 삭제
            setDivs(newDivs); // div 배열 업데이트
        }
    };

    return (
        <>
            <Tabs defaultValue="supplies" className="text-center">
                <TabsList>
                    <TabsTrigger value="supplies">준비물 리스트</TabsTrigger>
                    <TabsTrigger value="check">점검 리스트</TabsTrigger>
                </TabsList>

                <TabsContent value="supplies">
                    <P className="mb-2" variant="mainHeader">
                        여정 준비물 리스트
                    </P>
                    <P className="mb-2 text-neutral-400" variant="content">
                        여정에 필요한 준비물을 꼼꼼하게 검토해 보세요
                    </P>
                    <IconAndP className="flex flex-row justify-center mb-4" svg={pointerIcon} />
                    <Progress className="mb-4" value={progress} />
                    <div>
                        {showInput && (
                            <div className="flex flex-row w-full mb-4">
                                <Input ref={inputRef} className="w-36" type="input" placeholder="준비물 입력" />
                                <div className="w-5"></div>
                                {/* 공백을 위한 div */}
                                <Button variant="brand" onClick={handleAddDiv}>
                                    입력
                                </Button>
                                <div className="w-2"></div>
                                {/* 공백을 위한 div */}
                                <Button variant="error" onClick={handleHideInput}>
                                    취소
                                </Button>
                            </div>
                        )}
                        <Button
                            className="mb-4 border-2 border-border"
                            variant="ghost"
                            size="default"
                            onClick={handleShowInput}
                        >
                            <P variant="sectionHeader">+</P>
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            className="mb-4 border-2 border-border"
                            variant="ghost"
                            size="default"
                            onClick={handleRemoveDiv}
                        >
                            <P variant="sectionHeader">-</P>
                        </Button>
                        {divs.map((value, index) => (
                            <div key={index}>{value}</div>
                        ))}
                        {true ? (
                            <>
                                <P variant="sectionHeader" size="sm">
                                    준비물을 다 챙기셨군요!
                                </P>
                                <P className="mb-2" variant="sectionHeader" size="sm">
                                    여정을 위한 다음 점검 리스트를 확인하러 가요
                                </P>
                                <TabsList className="bg-white">
                                    <TabsTrigger className="text-white bg-brand-500 hover:bg-brand-400" value="check">
                                        점검 리스트로 이동
                                    </TabsTrigger>
                                </TabsList>
                            </>
                        ) : (
                            <>
                                <P variant="sectionHeader" size="sm">
                                    아직 준비물을 다 챙기지 않았어요
                                </P>
                                <P className="mb-2" variant="sectionHeader" size="sm">
                                    빼먹은 준비물이 없는지 리스트를 다시 확인해주세요
                                </P>
                                <TabsList className="bg-white">
                                    <TabsTrigger
                                        className="text-white bg-neutral-500 hover:bg-neutral-400"
                                        value="check"
                                    >
                                        점검 리스트로 이동
                                    </TabsTrigger>
                                </TabsList>
                            </>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="check">
                    <P className="mb-2" variant="mainHeader">
                        탑승 전 점검 리스트
                    </P>
                    <P className="text-neutral-400" variant="content">
                        공항에 도착했을 때 해야 할 일들을 점검해 보세요
                    </P>
                </TabsContent>
            </Tabs>
        </>
    );
}

export default CheckListPage;
