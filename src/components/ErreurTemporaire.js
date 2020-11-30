import React from 'react'
import stoffLogo from '../img/logo-big.webp';

const ErreurTemporaire = () => {
    return (
        <div className='erreur-temporaire'>
            <img src={stoffLogo} alt="stoff" id='logo-stoff'/>
            <p>La version mobile du site est en cours de construction.</p>
        </div>
    )
}

export default ErreurTemporaire
