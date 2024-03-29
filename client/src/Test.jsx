import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Div } from '@/components/atoms/Div.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Toggle } from '@/components/atoms/toggle';

import ToggleSupply from '@/components/modules/ToggleSupply';
import ToggleCheck from '@/components/modules/ToggleCheck';
import { NewspaperIcon } from 'lucide-react';

import { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getXXX, get2XXX } from '@/apis/api/funcApi';

import { useSelector, useDispatch } from 'react-redux';
import { testActions } from '@/stores/test';

function Test() {
    const dispatch = useDispatch();
    // let testword = useSelector((state) => state.word);
    // console.log('1', testword);
    // const helloHandler = () => {
    //     dispatch(testActions.hello);
    // };
    // const hiHandler = () => {
    //     dispatch(testActions.hi);
    // };

    // 1개만 사용할 경우
    // const { data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: get2XXX,
    // });
    // const [testword, setTestword] = useState('a');

    const results = useQueries({
        queries: [
            { queryKey: ['hello', 1], queryFn: getXXX },
            { queryKey: ['hi', 2], queryFn: get2XXX },
        ],
    });

    // results 배열에서 각 쿼리의 결과를 추출
    const [resultXXX, resultYYY] = results;

    // console.log(useSelector((state) => (state.word = testword)));
    // const aaa = useSelector((state) => (state.word = testword));
    // console.log('aaa', aaa);
    // setTestword(resultXXX.data);
    // console.log('aaa2', aaa);
    console.log(useSelector((state) => state.test.word));
    dispatch(testActions.changeReducer(resultXXX.data));
    console.log(useSelector((state) => state.test.word));

    //console.log(useSelector((state) => (state.word = 'hello 이자식아')));
    // dispatch(testActions.hello);
    //testword = 'bbb';

    return (
        <>
            <div>
                <Button onClick={() => console.log('click')}>Click me</Button>
                <Button variant="error">Error</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <P variant="mainHeader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>
                <P variant="sectionHeader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>
                <P variant="subHeader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, ipsam!</P>
                <P variant="content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, quibusdam.</P>
                <P variant="default">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>

                <Div borderColor="success" textColor="success" size="sm">
                    기내 수화물 가능
                </Div>
                <Div borderColor="success" textColor="success" size="default">
                    기내 수화물 가능
                </Div>
                <Div className="font-pretendardBold" borderColor="success" textColor="success" size="lg">
                    기내 수화물 가능
                </Div>
                {/* 변경을 위한 주석 테스트 */}
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
                <Progress value={33} />
                <Button className="border-2 border-border " variant="ghost" size="default">
                    <P variant="sectionHeader">+</P>
                </Button>
                <Toggle variant="outline">텍스트</Toggle>
                <ToggleSupply selected={true} supply="텍스트1"></ToggleSupply>
                <ToggleSupply selected={false} supply="텍스트2"></ToggleSupply>
                <ToggleCheck
                    iconLeft={<NewspaperIcon />}
                    title="title입니다"
                    content="content입니다"
                    iconRight={<NewspaperIcon />}
                    footerQuote="인용입니까?"
                />
                <p>
                    ====================================================================================================
                </p>
            </div>
            {resultXXX.data}
            <br />
            {resultYYY.data}
            <br />
        </>
    );
}

export default Test;
