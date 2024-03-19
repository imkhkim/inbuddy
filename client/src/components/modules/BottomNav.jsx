import { Outlet, Link } from 'react-router-dom';

import homeIcon from '@/assets/icons/home.png';
import listChecksIcon from '@/assets/icons/list-checks.png';
import baggageClaimIcon from '@/assets/icons/baggage-claim.png';
import ticketIcon from '@/assets/icons/ticket.png';
import settingsIcon from '@/assets/icons/settings.png';

function BottomNav() {
    return (
        <>
            <div>
                <Outlet />
            </div>
            <footer className="fixed bottom-0 w-full min-h-24 flex justify-center items-center">
                <div className="flex flex-row w-full justify-evenly items-center">
                    <Link to={`/main`}>
                        <img src={homeIcon} alt="홈 아이콘" />
                    </Link>
                    <Link to={`/checklist`}>
                        <img src={listChecksIcon} alt="점검 리스트 아이콘" />
                    </Link>
                    <Link to={`/checkincounterinfo`}>
                        <img src={baggageClaimIcon} alt="수하물 아이콘" />
                    </Link>
                    <Link to={`/flightticketinfo`}>
                        <img src={ticketIcon} alt="항공권  아이콘" />
                    </Link>
                    <Link to={`/settings`}>
                        <img src={settingsIcon} alt="설정 아이콘" />
                    </Link>
                </div>
            </footer>
        </>
    );
}

export default BottomNav;
