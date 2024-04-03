import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getflightDelayInfo = async (flightCode) => {
    console.log('code:', flightCode);
    return await server
        .post(`http://localhost:8000/api/predict`, {
            flight_code: flightCode,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getflightDelayInfo };
