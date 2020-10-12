import React, { useState } from 'react'
import { UserConext } from './conext/UserConext'

import { Approute } from './routes/Approute'

export const Prodac = () => {
    const [checkToken, setCheckToken] = useState(false)
    return (
        <UserConext.Provider value={{
            checkToken,
            setCheckToken
        }}>
            <Approute />
        </UserConext.Provider>
    )
}
