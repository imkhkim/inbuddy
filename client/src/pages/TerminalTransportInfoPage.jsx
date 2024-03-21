import React from "react";
import { P } from "@/components/atoms/P";
import SectionLayout from "@/components/modules/SectionLayout";

function TerminalTransportInfoPage() {
    return (
        <div className="mx-8">
            <P variant='mainHeader' className='my-10'>터미널 간 이동 방법</P>
            <SectionLayout sectionHeaderText='운행시간이 아닌가요?'>
                <P variant='content'>심야 시간에는 셔틀버스를 운행하지 않으므로 택시를 타고 이동하셔야 합니다.</P>
            </SectionLayout>
        </div>
    )
}

export default TerminalTransportInfoPage;