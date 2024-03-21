import React from "react";
import { P } from "@/components/atoms/P";


function SectionLayout({ sectionHeaderText, children }) {

    return (
        <>
            <P variant='sectionHeader' className='my-2'>{sectionHeaderText}</P>
            {children}
        </>
    )
}

export default SectionLayout;