import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';

import { P } from '@/components/atoms/P.jsx';

function IconAndP({ className, svg }) {
    return (
        <div className={(cn('flex flex-row'), className)}>
            <img src={svg} alt="포인터 아이콘" />
            <P variant="subHeader">&nbsp;&nbsp;기내 반입 제한물품에 대해 알아보기</P>
        </div>
    );
}

IconAndP.propTypes = {
    className: PropTypes.string,
    svg: PropTypes.string,
};

export default IconAndP;
