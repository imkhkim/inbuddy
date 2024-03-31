import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getTaskList = async () => {
    return await server
        .get('/api/journeys/{journey_id}/tasklist', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const checkTaskList = async () => {
    return await server
        .put('/api/journeys/{journey_id}/tasklist/{task_id}/check', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getTaskList, checkTaskList };
