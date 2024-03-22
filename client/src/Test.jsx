import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Div } from '@/components/atoms/Div.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Toggle } from '@/components/atoms/toggle';
import ToggleSupply from '@/components/modules/ToggleSupply';
function Test() {
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
            </div>
        </>
    );
}

export default Test;
