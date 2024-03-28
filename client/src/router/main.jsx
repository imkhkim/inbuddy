import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/stores/store.js';
import { Provider } from 'react-redux';
import { useState } from 'react';

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

const queryClient = new QueryClient();

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [email, setEmail] = useState('');

    const router = createBrowserRouter([
        {
            path: '/',
            element: loggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />,
        },
        {
            path: '/test',
            element: <Test />,
        },
        {
            path: '/login',
            element: <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />,
        },
        {
            path: '/',
            element: <BottomNav />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/main',
                    element: <JourneyCollectionPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
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

    return (
        <React.StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default Main;

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
