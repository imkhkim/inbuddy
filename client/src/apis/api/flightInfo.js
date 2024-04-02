import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getflightInfo = async (journeyId) => {
    return await server
        .get(`/journeys/${journeyId}/flight`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyflightInfo = async (journeyId, flightInfoId) => {
    return await server
        .put(`/journeys/${journeyId}/flight/${flightInfoId}/modify`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createflightInfo = async (journeyId) => {
    return await server
        .post(`/journeys/${journeyId}/flight/create`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getflightInfo, modifyflightInfo, createflightInfo };
