import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Div } from '@/components/atoms/Div.jsx';

function Test() {
    return (
        <>
            <div>
                <Button onClick={() => console.log('click')}>Click me</Button>
                <Button variant="error">Error</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <P>야호</P>
                <P color="sectionHeader" size="3xl">
                    야호
                </P>
                <P color="subHeader" size="xs">
                    야호
                </P>
                <P color="subHeader" size="3xl">
                    야호
                </P>
                <P variant="header" size="xs">
                    기능 테스트
                </P>
                <P color="nileBlue">기능 테스트</P>
                <P variant="default">기능 테스트</P>
                <P className="mb-5">야</P>
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
            </div>
        </>
    );
}

export default Test;
