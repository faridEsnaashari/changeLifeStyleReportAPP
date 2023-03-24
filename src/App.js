import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import ReportRouter from "./routers/report";
import InputIdRouter from "./routers/inputId";

import "./App.css";

const App = () => {
    return(
        <Router>
            <Switch>
                <Route path="/report">
                    <ReportRouter/>
                </Route>
                <Route path="/id">
                    <InputIdRouter/>
                </Route>
                <Redirect push to="/report"/>
            </Switch>
        </Router>
    );
};
export default App;
