import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Nav = () => {

    const numeroLink = {}
    const aufilLink = {}
    if (typeof window !== 'undefined') {
        if (window.location.pathname.includes('/au-fil/')) {
            aufilLink.color = "#B18522"
        }
        if (window.location.pathname.includes('/numeros/')) {
            numeroLink.color = "#B18522"
        }
    }
    return (
        <div className='nav'>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/'>stoff</AniLink>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={numeroLink} to='/numeros'>numéros</AniLink>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={aufilLink} to='/au-fil-de-l-eau'>au fil de l'eau</AniLink>
        </div>
    )
}

export default Nav
