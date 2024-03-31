import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

const today = new Date();


const initialState = [
    {
        "journeyId": 3,
        "journeyName": "여름 휴가",
        "flightInfo": {
            "departureDate": "2024-03-08",
            "flightCode": "TW213",
            "departureAirportIATA": "ICN",
            "arrivalAirportIATA": "NRT",
            "flightTime": "2h 30m",
            "departureTime": {
                "timeZone": "UTC+09:00",
                "time": "10:20"
            },
            "arrivalTime": {
                "timeZone": "UTC+09:00",
                "time": "12:50"
            },
            "departureAirportName": "인천",
            "arrivalAirportName": "도쿄/나리타"
        },
        "journeyDone": true,
        "journeyCreationDate": "2024-03-20T12:34:18.000+00:00",
        "journeyModificationDate": "2024-03-20T12:34:18.000+00:00"
    },
    {
        "journeyId": 5,
        "journeyName": "가족이랑 일본",
        "flightInfo": null,
        "journeyDone": false,
        "journeyCreationDate": "2024-03-20T13:00:35.000+00:00",
        "journeyModificationDate": "2024-03-20T13:00:35.000+00:00",
    }
]

let journeyId = 5



export const journeySlice = createSlice({
    name: 'journey',
    initialState: initialState,
    reducers: {
        addJourney(state, action) {
            journeyId++;
            const journey = {
                "journeyId": journeyId,
                "journeyName": action.payload.journeyName,
                "flightInfo": null,
                "journeyDone": false,
                "journeyCreationDate": null,
                "journeyModificationDate": null,
            }

            state.push(journey)
        },

        addFlight(state, action) {

            const flightInfo = action.payload.flightInfo

            const journey = state.find((element) => element.journeyId == action.payload.journeyId)
            journey.flightInfo = flightInfo
        }

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
export const { addJourney, addFlight } = journeySlice.actions

export default journeySlice.reducer