import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Div } from '@/components/atoms/Div.jsx';
import { P } from '@/components/atoms/P.jsx';

function ToggleCheck({ iconLeft, title, content, iconRight, footerQuote, check, linkPage, onHandleDivClick }) {
    // const [isCheck, setIsCheck] = useState(check);

    // const handleClick = () => {
    //     setIsCheck(!isCheck);
    // };
    return (
        <>
            <Div
                borderColor={check ? 'brand' : 'default'}
                className="flex flex-row justify-between py-10 cursor-pointer"
                onClick={onHandleDivClick}
            >
                {check ? <div className="text-brand-500">{iconLeft} </div> : <div>{iconLeft} </div>}
                <div className="items-start px-4">
                    <P font="font-pretendardRegular" size="lg" color={check ? 'brand' : 'black'}>
                        {title}
                    </P>
                    <P font="font-pretendardRegular" size="xs" color="neutral">
                        {content}
                    </P>
                </div>
                <div>{iconRight} </div>
            </Div>
            <P className="flex justify-end mb-4" font="font-pretendardRegular" size="sm">
                <Link to={linkPage}>{footerQuote}</Link>
            </P>
        </>
    );
}

ToggleCheck.propTypes = {
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    footerQuote: PropTypes.string,
    check: PropTypes.bool,
    linkPage: PropTypes.string,
    onHandleDivClick: PropTypes.func,
};

export default ToggleCheck;
