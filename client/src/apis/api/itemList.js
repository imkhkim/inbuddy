import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getItemList = async () => {
    return await server
        .get('/api/journeys/{journey_id}/itemlist')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const checkItemList = async () => {
    return await server
        .put('/api/journeys/{journey_id}/itemlist/{item_id}/check', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const deleteItemList = async () => {
    return await server
        .delete('/api/journeys/{journey_id}/itemlist/{item_id}/delete')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyItemList = async () => {
    return await server
        .put('/api/journeys/{journey_id}/itemlist/{item_id}/modify', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createItemList = async () => {
    return await server
        .post('/api/journeys/{journey_id}/itemlist/create', {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getItemList, checkItemList, deleteItemList, modifyItemList, createItemList };
