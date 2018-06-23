import React from 'react';
import { Router,
    Route,
    Switch,
    Link,
    NavLink
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
//
import NotFoundPage from '../components/NotFoundPage';
import MainPage from '../components/MainPage';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" exact={true} component={MainPage}/>

                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
