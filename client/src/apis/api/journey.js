import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getJourney = async () => {
    return await server
        .get('/api/journeys')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createJourney = async () => {
    return await server
        .post('/api/journeys', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const deleteJourney = async () => {
    return await server
        .delete('/api/journeys/{journey_id}/delete')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyJourney = async () => {
    return await server
        .put('/api/journeys/{journey_id}/modify', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getJourney, createJourney, deleteJourney, modifyJourney };
