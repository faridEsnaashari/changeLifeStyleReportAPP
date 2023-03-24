import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const InputIdPage = props => {

    const history = useHistory();

    const inputRef = useRef(null);

    const [ idError, setIdError ] = useState(false);

    const onClick = () => {
        const id = inputRef.current.value;

        if(!id){
            return setIdError(true);
        }

        localStorage.setItem("id", id);
        history.push("report");
    };

    return(
        <div className="name-main-container">
            <div className="name-input-container">
                <span className="id-mark">@</span>
                <span>آیدی خود را وارد کنید</span>
                <input ref={ inputRef } type="text"/>
                <div className="submit-button" onClick={ onClick }>ورود</div>
                { idError && <span className="id-error">آیدی خود را وارد کنید</span> }
            </div>
        </div>
    );
};

export default InputIdPage;
