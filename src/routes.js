import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Container/Home'
import Time from './Container/Time'


const Routes = () => {
    return(
        
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route  exact path="/time"  component={Time} />
                
            </Switch>
        </Router>
    )
 }
 
 export default Routes;