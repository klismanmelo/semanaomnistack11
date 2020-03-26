import React from 'react';
import{BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './Pages/Logon';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import NewIncidents from "./Pages/NewIncidents";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncidents}></Route>
            </Switch>
        </BrowserRouter>
    );
}