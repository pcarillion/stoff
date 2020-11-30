import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Materiaux = ({materiaux}) => {
    console.log(materiaux)
    
    return (
            <div className='materiaux-container component'>
                <h1>Matériaux</h1>
                <div>
                   
                    {materiaux.map((materiau, i) => {
                        return <AniLink >
                        <div className='materiau-container'>
                            <h2>{materiau.titre}</h2>
                            <div className='article-info-container'>
                                <p>par {materiau.auteur}</p>
                                {materiau.traducteur && <p>traduit de {materiau.langueOriginale}</p>}
                                {materiau.traducteur && <p>par {materiau.traducteur}</p>}
                                <p>{materiau.date}</p>
                            </div>
                            <div className='numeros-text-card'>
                                {materiau.presentation && documentToReactComponents(materiau.presentation.json)}
                            </div>
                            <p className='text-materiaux'>Lire l'article</p>
                            <div className='text-filter'></div>
                            <div className='right-info-container'>
                                <p>par {materiau.auteur}</p>
                                {materiau.traducteur && <p>traduit de {materiau.langueOriginale}</p>}
                                {materiau.traducteur && <p>par {materiau.traducteur}</p>}
                                <p>{materiau.date}</p>
                            </div>
                        </div>
                    </AniLink>})}
                </div>
            </div>
            

    )
}


export default Materiaux