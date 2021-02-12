import React, {useState, useEffect} from 'react'
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
    const [open, setOpen] = useState(false)


    const toggleNav = () => {
        setOpen(open => !open)
    }




    return (
        <div>
            <div className='nav'>
                <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/'>stoff</AniLink>
                <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={numeroLink} to='/numeros'>numéros</AniLink>
                <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={aufilLink} to='/au-fil-de-l-eau'>au fil de l'eau</AniLink>
            </div>
            <div className='nav-mobile'>
                <h1>stoff</h1>
                <div className={open?`nav-mobile-pop open`: `nav-mobile-pop closed`}>
                    <div className={`nav-btn`} onClick={toggleNav}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/'>stoff</AniLink>
                    <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} to='/commande'>commander</AniLink>
                    <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={numeroLink} to='/numeros'>numéros</AniLink>
                    <AniLink className={'navLink'} activeStyle={{ color: "#B18522" }} style={aufilLink} to='/au-fil-de-l-eau'>au fil de l'eau</AniLink>
                </div>
            </div>
        </div>
    )
}

export default Nav
