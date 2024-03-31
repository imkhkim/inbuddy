import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getflightInfo = async () => {
    return await server
        .get('/journeys/{journey_id}/flight')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyflightInfo = async () => {
    return await server
        .put('/journeys/{journey_id}/flight/{flight_info_id}/modify', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createflightInfo = async () => {
    return await server
        .post('/journeys/{journey_id}/flight/create', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getflightInfo, modifyflightInfo, createflightInfo };
