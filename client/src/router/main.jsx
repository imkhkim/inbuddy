import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../app/globals.css';

import App from '../App.jsx';

import BottomNav from '@/components/modules/BottomNav';
import Login from '@/pages/Login.jsx';
import JourneyCollectionPage from '@/pages/JourneyCollectionPage.jsx';
import CheckListPage from '@/pages/CheckListPage.jsx';
import CheckInCounterInfoPage from '@/pages/CheckInCounterInfoPage.jsx';
import FlightTicketInfoPage from '@/pages/FlightTicketInfoPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';

const isLoggedIn = false; // 로그인 여부에 따라 조건 설정

const router = createBrowserRouter([
    {
        path: '/',
        element: isLoggedIn ? (
            <Navigate to="/login" />
        ) : (
            <JourneyCollectionPage />
        ),
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/main',
        element: <JourneyCollectionPage />,
    },
    {
        path: '/checklist',
        element: <CheckListPage />,
    },
    {
        path: '/checkincounterinfo',
        element: <CheckInCounterInfoPage />,
    },
    {
        path: '/flightticketinfo',
        element: <FlightTicketInfoPage />,
    },
    {
        path: '/settings',
        element: <SettingsPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {isLoggedIn ? '' : <BottomNav />}
    </React.StrictMode>
);