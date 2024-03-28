import PropTypes from 'prop-types';

import { Div } from '@/components/atoms/Div.jsx';
import { P } from '@/components/atoms/P.jsx';
import { useState } from 'react';

function ToggleSupply({ selected, supply }) {
    const [isSelected, setIsSelected] = useState(selected);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };
    return (
        <>
            {isSelected ? (
                <Div className="w-full mb-4 cursor-pointer bg-border border-border" onClick={handleClick}>
                    <P className="text-xl line-through font-pretendardBold text-neutral-400 ">{supply}</P>
                </Div>
            ) : (
                <Div className="w-full mb-4 bg-white cursor-pointer border-border" onClick={handleClick}>
                    <P variant="sectionHeader">{supply}</P>
                </Div>
            )}
        </>
    );
}

ToggleSupply.propTypes = {
    selected: PropTypes.bool,
    supply: PropTypes.string,
    onClick: PropTypes.func, // onClick 프로퍼티 추가
};

export default ToggleSupply;
