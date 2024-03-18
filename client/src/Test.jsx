import { useState } from 'react';
import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Div } from '@/components/atoms/Div';

function Test() {
    const [count, setCount] = useState(0);

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
                <Div borderColor="brand">어이</Div>
            </div>
        </>
    );
}

export default Test;
