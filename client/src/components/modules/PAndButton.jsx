import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { P } from '@/components/atoms/P.jsx';
import { Button } from '@/components/atoms/Button';
import { TabsList, TabsTrigger } from '@/components/atoms/Tabs';

function PAndButton({ tabsContentValue, firstContent, secondContent, buttonContent, isReady }) {
    let content = null;
    if (tabsContentValue === 'checks') {
        content = (
            <Link to="/checkincounterinfo">
                <Button variant={isReady ? 'brand' : 'notReady'}>{buttonContent}</Button>
            </Link>
        );
    } else if (tabsContentValue === 'supplies') {
        content = (
            <TabsList className="bg-white">
                <TabsTrigger
                    className={
                        isReady
                            ? 'text-white bg-brand-500 hover:bg-brand-400'
                            : 'text-white bg-neutral-500 hover:bg-neutral-400'
                    }
                    value="checks"
                >
                    {buttonContent}
                </TabsTrigger>
            </TabsList>
        );
    }

    return (
        <>
            <P variant="sectionHeader" size="sm">
                {firstContent}
            </P>
            <P className="mb-2" variant="sectionHeader" size="sm">
                {secondContent}
            </P>
            {content}
        </>
    );
}

PAndButton.propTypes = {
    tabsContentValue: PropTypes.string,
    firstContent: PropTypes.string,
    secondContent: PropTypes.string,
    buttonContent: PropTypes.string,
    isReady: PropTypes.bool,
};

export default PAndButton;
