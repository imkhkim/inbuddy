import { useState } from 'react';
import { Button } from '@/components/atoms/button.jsx';
import { P } from '@/components/atoms/p.jsx';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <Button onClick={() => console.log('click')}>Click me</Button>
                <Button variant="error">Error</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <P>야호</P>
                <P size="lg">야호</P>
            </div>
        </>
    );
}

export default App;
