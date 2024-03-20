import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

import homeIcon from '@/assets/icons/home.svg';
import listChecksIcon from '@/assets/icons/list-checks.svg';
import baggageClaimIcon from '@/assets/icons/baggage-claim.svg';
import ticketIcon from '@/assets/icons/ticket.svg';
import settingsIcon from '@/assets/icons/settings.svg';

import homeIconColored from '@/assets/icons/home-colored.svg';
import listChecksIconColored from '@/assets/icons/list-checks-colored.svg';
import baggageClaimIconColored from '@/assets/icons/baggage-claim-colored.svg';
import ticketIconColored from '@/assets/icons/ticket-colored.svg';
import settingsIconColored from '@/assets/icons/settings-colored.svg';

function BottomNav() {
    const [isClicked, setIsClicked] = useState([true, false, false, false, false]);

    function handleClick(e, index) {
        const updatedClickedState = isClicked.map((value, i) => i === index);

        setIsClicked(updatedClickedState); // 상태 업데이트
    }

    return (
        <div className="flex items-center justify-center">
            <div>
                <Outlet />
            </div>
            <footer className="fixed bottom-0 flex items-center justify-center w-full border-t-2 border-black min-h-24">
                <div className="flex flex-row items-center w-full justify-evenly">
                    <Link to="/main">
                        <img
                            src={isClicked[0] ? homeIconColored : homeIcon}
                            alt="홈 아이콘"
                            onClick={(e) => handleClick(e, 0)}
                        />
                    </Link>
                    <Link to="/checklist">
                        <img
                            src={isClicked[1] ? listChecksIconColored : listChecksIcon}
                            alt="점검 리스트 아이콘"
                            onClick={(e) => handleClick(e, 1)}
                        />
                    </Link>
                    <Link to="/checkincounterinfo">
                        <img
                            src={isClicked[2] ? baggageClaimIconColored : baggageClaimIcon}
                            alt="수하물 아이콘"
                            onClick={(e) => handleClick(e, 2)}
                        />
                    </Link>
                    <Link to="/flightticketinfo">
                        <img
                            src={isClicked[3] ? ticketIconColored : ticketIcon}
                            alt="항공권 아이콘"
                            onClick={(e) => handleClick(e, 3)}
                        />
                    </Link>
                    <Link to="/settings">
                        <img
                            src={isClicked[4] ? settingsIconColored : settingsIcon}
                            alt="설정 아이콘"
                            onClick={(e) => handleClick(e, 4)}
                        />
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default BottomNav;
