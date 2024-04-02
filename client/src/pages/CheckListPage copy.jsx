import { useState, useRef, useEffect } from 'react';
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

import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

import pointerIcon from '@/assets/icons/pointer.svg';
import alertTriangleIcon from '@/assets/icons/alert-triangle.svg';
import checkCircleIcon from '@/assets/icons/check-circle.svg';
import { NewspaperIcon, BaggageClaimIcon, DollarSignIcon, WifiIcon, CircleIcon, CircleCheckIcon } from 'lucide-react';

import { getItemList, createItemList } from '@/apis/api/itemList';
import { getTaskList, checkTaskList } from '@/apis/api/taskList';

import { itemActions } from '@/stores/itemStore';
import { taskActions } from '@/stores/taskStore';

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
    const taskList = useSelector((state) => state.task);

    const [divs, setDivs] = useState([]); // div들을 관리할 배열 상태 변수
    const [showInput, setShowInput] = useState(false); // input 상태 변수 생성

    const inputRef = useRef(null);

    // const itemListApis = useQueries({
    //     queries: [
    //         { queryKey: ['item', 1], queryFn: async () => getItemList(1), enabled: true },
    //         { queryKey: ['item', 2], queryFn: async () => createItemList(1, inputRef.current.value.trim()) },
    //     ],
    // });
    // itemListApis 배열에서 각 쿼리의 결과를 추출
    //const [resultXXX, resultYYY] = itemListApis;

    const { data: itemListData, refetch: refetchItemListData } = useQuery({
        queryKey: ['item'],
        queryFn: async () => getItemList(1),
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    const { data: taskListData } = useQuery({
        queryKey: ['task'],
        queryFn: async () => getTaskList(1),
        enabled: true,
    });
    //console.log(useSelector((state) => state.task));
    const [checkPassport, setCheckPassport] = useState(false);
    const [checkCheckIn, setCheckCheckIn] = useState(false);
    const [checkExchange, setCheckExchange] = useState(false);
    const [checkRoaming, setCheckRoaming] = useState(false);

    const [progressItem, setProgressItem] = useState(0);
    const [progressTask, setProgressTask] = useState(0);
    const [checkAllItem, setCheckAllItem] = useState(false);

    useEffect(() => {
        if (itemListData) {
            //console.log(itemListData.data);
            dispatch(itemActions.setItem(itemListData.data)); // 전역 상태에 저장
            const initialDivs = itemListData.data.map((item, index) => (
                <ToggleSupply key={index} selected={item.itemDone} supply={item.itemName} onRemove={handleRemoveDiv} />
            ));
            setDivs(initialDivs);
        }
    }, [itemListData, dispatch]);
    //console.log(divs);
    //console.log(useSelector((state) => state.item[0]));

    useEffect(() => {
        if (taskListData) {
            // console.log(taskListData.data);
            dispatch(taskActions.setTask(taskListData.data)); // 전역 상태에 저장
        }
    }, [taskListData]);

    useEffect(() => {
        taskList.map((task) => {
            const taskName = task.taskName.slice(0, 2);
            if (taskName === '여권') {
                setCheckPassport(task.taskDone);
            } else if (taskName === '탑승') {
                setCheckCheckIn(task.taskDone);
            } else if (taskName === '환전') {
                setCheckExchange(task.taskDone);
            } else if (taskName === '로밍') {
                setCheckRoaming(task.taskDone);
            }
        });
    }, [taskList]);

    // 여기 해야 됌
    useEffect(() => {
        if (itemListData) {
            //console.log(divs.length);
            //console.log(itemList);
            //console.log(itemList.map((item) => item.itemDone));
            const oneStep = 100 / divs.length;
            //console.log(oneStep);
            // console.log(divs);
            // if (itemListData) {
            //     itemListData.data.map((item) => {
            //         if (item.itemDone === false) {
            //             console.log(item, item.itemDone);
            //             setCheckAllItem(false);
            //         }
            //     });
            // }
            console.log(checkAllItem);
            let progressCount = 0;
            itemListData.data.map((item) => {
                if (item.itemDone === true) {
                    progressCount++;
                }
            });

            const timer = setTimeout(() => setProgressItem(oneStep * progressCount), 500);
            return () => clearTimeout(timer);
        }
    }, [divs.length, itemListData]);

    useEffect(() => {
        const timer = setTimeout(
            () =>
                setProgressTask(
                    (checkPassport ? 25 : 0) +
                        (checkCheckIn ? 25 : 0) +
                        (checkExchange ? 25 : 0) +
                        (checkRoaming ? 25 : 0)
                ),
            500
        );
        return () => clearTimeout(timer);
    }, [checkPassport, checkCheckIn, checkExchange, checkRoaming]);

    const handleShowInput = () => {
        setShowInput(true);
    };

    const handleHideInput = () => {
        setShowInput(false);
    };

    const handleDivClick = (event) => {
        //console.log('클릭', event.target.innerText.slice(0, 2));
        //console.log(taskListData.data.map((task) => task.taskName.slice(0, 2)));
        if (taskListData) {
            taskListData.data.map((task) => {
                const taskNameDB = task.taskName.slice(0, 2);
                const taskNameEvent = event.target.innerText.slice(0, 2);
                if (taskNameDB === taskNameEvent) {
                    if (taskNameEvent === '여권') {
                        checkTaskList(1, task.taskId);
                        setCheckPassport(!checkPassport);
                    } else if (taskNameEvent === '탑승') {
                        checkTaskList(1, task.taskId);
                        setCheckCheckIn(!checkCheckIn);
                    } else if (taskNameEvent === '환전') {
                        checkTaskList(1, task.taskId);
                        setCheckExchange(!checkExchange);
                    } else if (taskNameEvent === '로밍') {
                        checkTaskList(1, task.taskId);
                        setCheckRoaming(!checkRoaming);
                    }
                }
            });
        }
    };

    const handleAddDiv = useCallback(() => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue !== '') {
            // 입력 값이 비어있지 않을 경우에만 실행
            const newDivs = [...divs]; // 기존 div 배열 복사
            createItemList(1, { journeyId: 1, itemName: inputValue });
            newDivs.push(<ToggleSupply selected={false} supply={inputValue} onRemove={handleRemoveDiv} />); // 새로운 div 추가
            setDivs(newDivs); // div 배열 업데이트
            inputRef.current.value = ''; // 입력 값 초기화
        }
    }, [divs]);

    const handleRemoveDiv = async (itemId) => {
        //deleteItemList(1, itemId);
        dispatch(itemActions.deleteItem(itemId));
        await refetchItemListData();
        if (itemList.data === undefined) {
            setDivs([]);
        } else {
            setDivs(
                itemListData.data.map((item, index) => (
                    <ToggleSupply
                        key={index}
                        selected={item.itemDone}
                        supply={item.itemName}
                        onRemove={handleRemoveDiv}
                    />
                ))
            );
        }
    };

    useEffect(() => {
        refetchItemListData();
        console.log(itemListData);
    }, [itemListData, refetchItemListData, handleAddDiv]);

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

                    <Progress className="mb-4" value={progressItem} />
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
                        {checkAllItem ? (
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
                    <Progress className="mb-4" value={progressTask} />
                    {checkAllItem ? (
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
                                        text={`챙기지 않은 준비물이 ${progressItem}개 있어요!`}
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
                        iconRight={checkPassport ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="여권이 없다면?"
                        check={checkPassport}
                        linkPage="/info/passport"
                        onHandleDivClick={handleDivClick}
                    />
                    <ToggleCheck
                        iconLeft={<BaggageClaimIcon />}
                        title="탑승수속을 완료했나요?"
                        content="수속/수화물 위탁은 출발 50분 전에 마감해요."
                        iconRight={checkCheckIn ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="내 체크인 카운터는?"
                        check={checkCheckIn}
                        linkPage="/checkincounterinfo"
                        onHandleDivClick={handleDivClick}
                    />
                    <ToggleCheck
                        iconLeft={<DollarSignIcon />}
                        title="환전을 완료했나요?"
                        content="카드가 있더라도 현금이 없다면 불편할 수 있어요."
                        iconRight={checkExchange ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="환전할 곳을 찾는다면?"
                        check={checkExchange}
                        linkPage="/info/exchange"
                        onHandleDivClick={handleDivClick}
                    />
                    <ToggleCheck
                        iconLeft={<WifiIcon />}
                        title="로밍 서비스를 신청했나요?"
                        content="외국에서 인터넷을 위해 로밍 서비스는 필수에요."
                        iconRight={checkRoaming ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                        footerQuote="로밍을 해줄 곳을 찾는다면?"
                        check={checkRoaming}
                        linkPage="/info/roaming"
                        onHandleDivClick={handleDivClick}
                    />
                    {checkPassport && checkCheckIn && checkExchange && checkRoaming ? (
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
