import React, { useContext, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Login } from '../components/panel/Login';
import { TablaScreen } from '../components/panel/TablaScreen';

import { Agradecimiento } from '../components/prodac/Agradecimiento';
import { Formulario } from '../components/prodac/Formulario';
import { UserConext } from '../conext/UserConext';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';


export const Approute = () => {
    const {checkToken,setCheckToken} = useContext(UserConext);
    useEffect(() => {
        const verifyToken=async()=>{
            const tokeStorage=localStorage.getItem('token');
            if(tokeStorage===null){
                return setCheckToken(false);
            }
            const resp=await fetch('http://localhost/phpprodac/controllers/verifytoken.php',{
                method:'POST',
                body:JSON.stringify({jwt:tokeStorage})
            })
            const body=await resp.json();
            const {user}=body
            if(user.ok){
                return setCheckToken(true);
            }
            setCheckToken(false);
        }
        verifyToken();
    }, [])

  


    return (
        <Router>
            <div>
                <Switch>
                <Route path="/" exact component={Formulario} />
                <PublicRouter
                    exact
                    path='/login'
                    component={Login}
                    isAuthenticated={checkToken}
                    />
                 <PrivateRouter path='/panel'
                    exact
                    component={TablaScreen}    
                    isAuthenticated={checkToken} />
               
                   <Route path="/agradecimiento" exact component={Agradecimiento} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
