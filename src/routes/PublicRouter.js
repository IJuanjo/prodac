import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'

export const PublicRouter = (
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
                    ? (<Redirect  to="/panel" />)
                    : (<Component {...props} />)
                )}
        /> 
    )
}

PublicRouter.prototype={
    isAuthenticated:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}