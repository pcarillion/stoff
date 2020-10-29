import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Nav = () => {
    return (
        <div className='nav'>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/'>stoff</AniLink>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/numeros'>numéros</AniLink>
            <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/au-fil-de-l-eau'>au fil de l'eau</AniLink>
        </div>
    )
}

export default Nav
