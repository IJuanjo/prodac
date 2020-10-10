import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Formulario } from './components/prodac/Formulario.jsx';
import { Agradecimiento } from './components/prodac/Agradecimiento.jsx';
export const Prodac = () => {
    return (
        <Router>
            <div>
                <Switch>
                   <Route path="/" exact component={Formulario} />
                   <Route path="/agradecimiento" exact component={Agradecimiento} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
