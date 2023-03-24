import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    RECIVED_SEND_REPORTS,
    REQUESTED_SEND_REPORTS,
    FAILED_SEND_REPORTS,
} from "../../actionsTypes/sendReportsActionsTypes";

export const sendReportsInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const sendReportsReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_SEND_REPORTS: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_SEND_REPORTS: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: action.payload.data,
                error: null,
            };
            break;

        case FAILED_SEND_REPORTS: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
            
        default: 
            currentState = state;
    }

    return currentState;
};

