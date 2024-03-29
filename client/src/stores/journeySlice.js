import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

[
    // "status": “200” or “400”
    {
        "status": "200",
        "message": "여정 목록을 가져오기 성공",
        "data": [
            {
                "journeyId": 3,
                "journeyName": "여름 휴가",
                "flightCode": "ABC123",
                "journeyDone": true,
                "journeyCreationDate": "2024-03-      20T12:34:18.000+00:00",
                "journeyModificationDate": "2024-03-20T12:34:18.000+00:00"
            },
            {
                "journeyId": 5,
                "journeyName": "여름 휴가2",
                "flightCode": "ABC123",
                "journeyDone": true,
                "journeyCreationDate": "2024-03-20T13:00:35.000+00:00",
                "journeyModificationDate": "2024-03-20T13:00:35.000+00:00"
            }
        ]
    }
]


// 초기에 미리 받아올 정보 요청 한 10개 정도?

// 

// 무한 스크롤 구현을 위해 특정 조건 시 
// const InfiniteQueries = () => {
//     const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
//         useInfiniteQuery({
//             queryKey: ["colors"],
//             queryFn: fetchColors,
//             initialPageParam: 1,
//             getNextPageParam: (lastPage, allPages) => {
//                 return allPages.length < 4 && allPages.length + 1;
//             },
//             // ...
//         });




export const journeySlice = createSlice({
    name: 'journey',
    initialState: [{
        "journeyId": 3,
        "journeyName": "여름 휴가",
        "flightCode": "ABC123",
        "journeyDone": true,
        "journeyCreationDate": "2024-03-      20T12:34:18.000+00:00",
        "journeyModificationDate": "2024-03-20T12:34:18.000+00:00"
    },
    {
        "journeyId": 5,
        "journeyName": "가족이랑 일본",
        "flightCode": null,
        "journeyDone": false,
        "journeyCreationDate": "2024-03-20T13:00:35.000+00:00",
        "journeyModificationDate": "2024-03-20T13:00:35.000+00:00",
        "journeyDate": "23.06.14",
    }],
    reducers: {
        addJourney(state, action) {
            state.push(action.payload)
        },

        // deleteJourney(state, action) {
        //     state.filter()
        // },
        // updateJourney()


        // addFlight(state, action) {

        // },

        // updateFlight() {

        // },

        // updateJourneyName

        // deleteJourney(state, action) {}
        // ,

    },
})

// Action creators are generated for each case reducer function
export const { addJourney } = journeySlice.actions

export default journeySlice.reducer