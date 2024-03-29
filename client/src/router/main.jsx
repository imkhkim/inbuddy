import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../app/globals.css';

import Test from '../Test.jsx';

import BottomNav from '@/components/modules/BottomNav';
import Login from '@/pages/Login.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import JourneyCollectionPage from '@/pages/JourneyCollectionPage.jsx';
import CheckListPage from '@/pages/CheckListPage.jsx';
import CheckInCounterInfoPage from '@/pages/CheckInCounterInfoPage.jsx';
import FlightTicketInfoPage from '@/pages/FlightTicketInfoPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import BaggageInfoPage from '@/pages/BagaggeInfoPage';
import ExchangeInfoPage from '@/pages/ExchangeInfoPage';
import PassportInfoPage from '@/pages/PassportInfoPage';
import RoamingInfoPage from '@/pages/RoamingInfoPage';
import TerminalTransportInfoPage from '@/pages/TerminalTransportInfoPage';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isLoggedIn = false; // 로그인 여부에 따라 조건 설정
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/main" />,
    },
    {
        path: '/test',
        element: <Test />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <BottomNav />,
        errorElement: <ErrorPage />,
        children: [
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
            {
                path: '/info/exchange',
                element: <ExchangeInfoPage />,
            },
            {
                path: '/info/passport',
                element: <PassportInfoPage />,
            },
            {
                path: '/info/roaming',
                element: <RoamingInfoPage />,
            },
            {
                path: '/info/baggage',
                element: <BaggageInfoPage />,
            },
            {
                path: '/info/terminaltransport',
                element: <TerminalTransportInfoPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-left' />
        </QueryClientProvider>
    </React.StrictMode>
);
