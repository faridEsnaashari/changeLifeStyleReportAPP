import { useState, useEffect } from "react";

import "./indexStyles.css";

import useAPICaller from "../../APIs/APICallers/APICallers";

import LoadingCircle from "../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import {SUCCESS_MSG} from "../../tools/statusCodes";

const ReportPage = props => {

    const [ idInput, setIdInput ] = useState("");
    
    const [ descriptionInput, setDescriptionInput ] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("id");
        setIdInput(id);
    }, []);

    const [ sendReportsAction, sendReportsResult ] = useAPICaller().sendReportsCaller;

    const [ reportItems, setReportItems ] = useState({
        porn: false,
        sigrate: false,
        alcohol: false,
        ghand: false,
        water: false,
        reading: false,
        exsersize: false,
        sleep: false,
        shower: false,
    });

    useEffect(() => {
        if(sendReportsResult.status === SUCCESS_MSG){
            localStorage.setItem("messageId", sendReportsResult.data.messageId);

            const time = new Date();
            localStorage.setItem("messageTime", time.getTime());
        }
    }, [sendReportsResult]);

    const onValueChanged = item => {
        const preparedReportItems = { ...reportItems };
        preparedReportItems[item] = !reportItems[item];

        setReportItems(preparedReportItems);
    };

    const onSubmit = () => {

        const id = idInput;

        if(!id){
            return setIdError(true);
        }

        localStorage.setItem("id", id);

        const messageTime = localStorage.getItem("messageTime");
        const messageId = localStorage.getItem("messageId");

        const description = descriptionInput;
        
        sendReportsAction({ ...reportItems, id, messageId, messageTime, description });
    };

    const [ idError, setIdError ] = useState(false);

    return(
        <div className="report-main-container">
            <label>
                بدون پورن
                <input type="checkbox" checked={ reportItems.porn } onChange={ () => onValueChanged("porn") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                بدون سیگار 
                <input type="checkbox" checked={ reportItems.sigrate } onChange={ () => onValueChanged("sigrate") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                بدون الکل
                <input type="checkbox" checked={ reportItems.alcohol } onChange={ () => onValueChanged("alcohol") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                بدون قند مصنوعی
                <input type="checkbox" checked={ reportItems.ghand } onChange={ () => onValueChanged("ghand") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                ۱/۵ لیتر آب
                <input type="checkbox" checked={ reportItems.water } onChange={ () => onValueChanged("water") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                مطالعه
                <input type="checkbox" checked={ reportItems.reading } onChange={ () => onValueChanged("reading") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                تمرین
                <input type="checkbox" checked={ reportItems.exsersize } onChange={ () => onValueChanged("exsersize") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                ۸ ساعت خواب
                <input type="checkbox" checked={ reportItems.sleep } onChange={ () => onValueChanged("sleep") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                دوش آب سرد
                <input type="checkbox" checked={ reportItems.shower } onChange={ () => onValueChanged("shower") }/>
                <span className="radio-button-style"/>
            </label>
            <label>
                توضیحات:
            </label>
            <textarea onChange={ e => setDescriptionInput(e.target.value) }/>
            <div className="name-input-container">
                <span>آیدی خود را وارد کنید</span>
                <div className="name-input">
                    <span className="id-mark">@</span>
                    <input value={ idInput } onChange={ e => setIdInput(e.target.value) } type="text"/>
                </div>
                { idError && <span className="id-error">آیدی خود را وارد کنید</span> }
            </div>
            <div className="submit-botton" onClick={ onSubmit }>
                {
                    sendReportsResult.isFetching 
                        ?
                            <div>
                                <LoadingCircle color="#f7d20c" size="3"/>
                            </div>
                            :
                            <span>ارسال گزارش</span>
                }
            </div>
        </div>
    );
};

export default ReportPage;
