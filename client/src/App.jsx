import { useState } from 'react';
import { Button } from '@/components/atoms/button.jsx';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <Button onClick={() => console.log('click')}>Click me</Button>
                <Button variant="error">Error</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
            </div>
        </>
    );
}

export default App;
