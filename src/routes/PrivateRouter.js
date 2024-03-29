import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'

export const PrivateRouter = (
{
    isAuthenticated,
    component:Component,
    ...res
}) => {


    return (
        <Route {...res}
            component={
                (props)=>(
                    (isAuthenticated)
                    ? (<Component {...props} />)
                    :
                    (<Redirect  to="/login" />)
                )}
        /> 
    )
}

PrivateRouter.prototype={
    isAuthenticated:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}