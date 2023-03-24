import axios from "axios";

import {
    RECIVED_SEND_REPORTS,
    REQUESTED_SEND_REPORTS,
    FAILED_SEND_REPORTS,

} from "../../actionsTypes/sendReportsActionsTypes";

export const sendReportsAction = (dispatch, params) => {
    dispatch({ type: REQUESTED_SEND_REPORTS });

    axios.get(`/report`, { params })
        .then(response => dispatch({
            type: RECIVED_SEND_REPORTS,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_SEND_REPORTS,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};
