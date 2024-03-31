import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Input } from '@/components/atoms/input';
import IconAndP from '@/components/modules/IconAndP';
import PAndButton from '@/components/modules/PAndButton';
import ToggleSupply from '@/components/modules/ToggleSupply';
import ToggleCheck from '@/components/modules/ToggleCheck';

import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useQuery, useQueries } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { itemActions } from '@/stores/itemStore';

import pointerIcon from '@/assets/icons/pointer.svg';
import alertTriangleIcon from '@/assets/icons/alert-triangle.svg';
import checkCircleIcon from '@/assets/icons/check-circle.svg';
import { NewspaperIcon, BaggageClaimIcon, DollarSignIcon, WifiIcon, CircleIcon, CircleCheckIcon } from 'lucide-react';

import { getItemList, createItemList, deleteItemList } from '@/apis/api/itemList';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// 변경해야 할 사안!!
// 1을 나중에 해당 여정의 전역값?으로 바꿔주어야 함

function CheckListPage() {
    const dispatch = useDispatch();
    const itemList = useSelector((state) => state.item);

    const [progress, setProgress] = React.useState(13);
    const [divs, setDivs] = useState([]); // div들을 관리할 배열 상태 변수
    const [showInput, setShowInput] = useState(false); // input 상태 변수 생성
    //const [items, setItems] = useState(getItems(10));

    const inputRef = useRef(null);
    // const itemListApis = useQueries({
    //     queries: [
    //         { queryKey: ['item', 1], queryFn: async () => getItemList(1), enabled: true },
    //         { queryKey: ['item', 2], queryFn: async () => createItemList(1, inputRef.current.value.trim()) },
    //     ],
    // });
    // itemListApis 배열에서 각 쿼리의 결과를 추출
    //const [resultXXX, resultYYY] = itemListApis;

    const { data, isLoading } = useQuery({
        queryKey: ['item'],
        queryFn: async () => getItemList(1),
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    useEffect(() => {
        if (!isLoading && data) {
            //console.log(data.data);
            dispatch(itemActions.setItem(data.data)); // 전역 상태에 저장
            const initialDivs = data.data.map((item, index) => (
                <ToggleSupply
                    key={index}
                    selected={item.itemDone}
                    supply={item.itemName}
                    handleRemoveDiv={handleRemoveDiv}
                />
            ));
            setDivs(initialDivs);
        }
    }, [isLoading, data]);
    console.log(divs);
    //console.log(useSelector((state) => state.item[0]));

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
            createItemList(1, { journeyId: 1, itemName: inputValue });
            newDivs.push(<ToggleSupply selected={false} supply={inputValue} handleRemoveDiv={handleRemoveDiv} />); // 새로운 div 추가
            setDivs(newDivs); // div 배열 업데이트
            inputRef.current.value = ''; // 입력 값 초기화
        }
    };

    const handleRemoveDiv = () => {
        console.log('부모 삭제 중');
        console.log(itemList);
        // console.log(divs);
        // if (divs.length > 0) {
        //     console.log('if문 진입');
        //     // const newDivs = [...divs]; // 기존 div들을 복사
        //     // deleteItemList(1, newDivs.length);
        //     // newDivs.pop(); // 마지막 div 삭제
        //     // setDivs(newDivs); // div 배열 업데이트
        // }
    };

    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) {
                return;
            }
            const reorderedItems = reorder(divs, result.source.index, result.destination.index);
            setDivs(reorderedItems);
        },
        [divs]
    );

    return (
        <>
            <Tabs defaultValue="checks" className="text-center">
                <TabsList>
                    <TabsTrigger value="supplies">준비물 리스트</TabsTrigger>
                    <TabsTrigger value="checks">점검 리스트</TabsTrigger>
                </TabsList>

                <TabsContent value="supplies">
                    <P className="mb-2" variant="mainHeader">
                        여정 준비물 리스트
                    </P>
                    <P className="mb-2 text-neutral-400" variant="content">
                        여정에 필요한 준비물을 꼼꼼하게 검토해 보세요
                    </P>
                    <Link to="/info/baggage">
                        <IconAndP
                            className="flex flex-row justify-center mb-4"
                            svg={pointerIcon}
                            text="기내 반입 제한물품에 대해 알아보기"
                        />
                    </Link>

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

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div ref={provided.innerRef}>
                                        {divs.map((value, index) => (
                                            // <div key={index}>{value}</div>
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps}>
                                                        <div ref={provided.innerRef} {...provided.dragHandleProps}>
                                                            {value}
                                                        </div>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {true ? (
                            <PAndButton
                                tabsContentValue="supplies"
                                firstContent="준비물을 다 챙기셨군요!"
                                secondContent="여정을 위한 다음 점검 리스트를 확인하러 가요"
                                buttonContent="점검 리스트로 이동"
                                isReady={true}
                            />
                        ) : (
                            <>
                                <PAndButton
                                    tabsContentValue="supplies"
                                    firstContent="아직 준비물을 다 챙기지 않았어요"
                                    secondContent="빼먹은 준비물이 없는지 리스트를 다시 확인해주세요"
                                    buttonContent="점검 리스트로 이동"
                                    isReady={false}
                                />
                            </>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="checks">
                    <P className="mb-2" variant="mainHeader">
                        탑승 전 점검 리스트
                    </P>
                    <P className="mb-2 text-neutral-400" variant="content">
                        공항에 도착했을 때 해야 할 일들을 점검해 보세요
                    </P>
                    <Progress className="mb-4" value={progress} />
                    {true ? (
                        <>
                            <TabsList className="bg-white">
                                <TabsTrigger value="supplies">
                                    <IconAndP
                                        className="flex flex-row justify-center mb-4 hover:bg-success-300/50 hover:rounded"
                                        svg={checkCircleIcon}
                                        text="모든 준비물을 챙겼어요"
                                        color="success"
                                    />
                                </TabsTrigger>
                            </TabsList>
                        </>
                    ) : (
                        <>
                            <TabsList className="bg-white">
                                <TabsTrigger value="supplies">
                                    <IconAndP
                                        className="flex flex-row justify-center mb-4 hover:bg-error-300/50 hover:rounded"
                                        svg={alertTriangleIcon}
                                        text="챙기지 않은 준비물이 ${itemCount}개 있어요!"
                                        color="error"
                                    />
                                </TabsTrigger>
                            </TabsList>
                        </>
                    )}
                    <ToggleCheck
                        iconLeft={<NewspaperIcon />}
                        title="여권을 챙겼는지 확인했나요?"
                        content="여권 미지참 시 출국이 불가해요."
                        iconRight={true ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="여권이 없다면?"
                        check={true}
                        linkPage="/info/passport"
                    />
                    <ToggleCheck
                        iconLeft={<BaggageClaimIcon />}
                        title="탑승수속을 완료했나요?"
                        content="수속/수화물 위탁은 출발 50분 전에 마감해요."
                        iconRight={false ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="내 체크인 카운터는?"
                        check={false}
                        linkPage="/checkincounterinfo"
                    />
                    <ToggleCheck
                        iconLeft={<DollarSignIcon />}
                        title="환전을 완료했나요?"
                        content="카드가 있더라도 현금이 없다면 불편할 수 있어요."
                        iconRight={false ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="환전할 곳을 찾는다면?"
                        check={false}
                        linkPage="/info/exchange"
                    />
                    <ToggleCheck
                        iconLeft={<WifiIcon />}
                        title="로밍 서비스를 신청했나요?"
                        content="외국에서 인터넷을 위해 로밍 서비스는 필수에요."
                        iconRight={false ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="로밍을 해줄 곳을 찾는다면?"
                        check={false}
                        linkPage="/info/roaming"
                    />
                    {true ? (
                        <PAndButton
                            tabsContentValue="checks"
                            firstContent="출국을 위한 모든 점검이 끝났어요"
                            secondContent="이제 비행기를 타러 갈 일만 남았군요!"
                            buttonContent="출국 준비 완료"
                            isReady={true}
                        />
                    ) : (
                        <PAndButton
                            tabsContentValue="checks"
                            firstContent="모든 점검이 완료되지 않았어요"
                            secondContent="빠진 것은 없는지 다시 한 번 확인해 주세요"
                            buttonContent="출국 준비 완료"
                            isReady={false}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </>
    );
}

export default CheckListPage;
