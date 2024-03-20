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
                <Div borderColor="success" textColor="success" size="sm">
                    기내 수화물 가능
                </Div>
                <Div borderColor="success" textColor="success" size="default">
                    기내 수화물 가능
                </Div>
                <Div className="font-pretendardBold" borderColor="success" textColor="success" size="lg">
                    기내 수화물 가능
                </Div>
            </div>
        </>
    );
}

export default Test;
