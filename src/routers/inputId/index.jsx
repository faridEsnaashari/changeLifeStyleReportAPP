import { Switch, Route, useRouteMatch } from "react-router-dom";

import routes from "../../routes/inputId";

const ReportRouter = props => {

    const { url } = useRouteMatch();

    const getRoutes = () => routes.map((route, index) => (
        <Route key={ index } path={`${ url }${ route.path }`}>
            <route.component/>
        </Route>
    ));

    return(
        <Switch>
            { getRoutes() }
        </Switch>
    );
};

export default ReportRouter;
