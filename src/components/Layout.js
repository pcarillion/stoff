import React from 'react'

import './layout.css'
import Nav from './Nav'
import ErreurTemporaire from './ErreurTemporaire'

const Layout = ({children}) => {
    return (
        <div>
            <div id="all-content">
                <Nav/>
                {children}  
            </div>
            <ErreurTemporaire/>
        </div>
    )
}

export default Layout
