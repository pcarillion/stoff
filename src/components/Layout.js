import React from 'react'

import './layout.css'
import Nav from './Nav'

const Layout = ({children}) => {
    return (
        <div>
            <Nav/>
            {children}
        </div>
    )
}

export default Layout
