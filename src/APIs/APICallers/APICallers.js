import { useReducer } from "react";

import { API_URL } from "../../tools/config";
import axios from "axios";

import {
    sendReportsReducer,
    
    sendReportsInitialState,
} from "../reducers/sendReports/sendReportsReducer";

import { 
    sendReportsAction,
} from "../actions/sendReports/sendReportsAction";

axios.defaults.baseURL = API_URL;

export const useAPICaller = () => {
    const [ sendReportsResult, sendReportsDispatch ] = useReducer(sendReportsReducer, sendReportsInitialState);
    const sendReports = data => sendReportsAction(sendReportsDispatch, data);

    return { 
        sendReportsCaller: [ sendReports, sendReportsResult ],
    };
};

export default useAPICaller;
