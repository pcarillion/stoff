import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'

const Materiau = ({data}) => {
    const {titre, auteur, dateDePublication, sousTitre, presentation, photoPrincipale, materiaux, url} = data.article1
    
    console.log(materiaux)
    
    return (
        <Layout>
            <SEO title={'Matériaux | ' + titre}/>
            <div className='materiaux-container'>
                <h1>Matériaux pour " {titre} "</h1>
                <div>
                    {materiaux?
                    materiaux.map((materiau, i) => {
                        return <AniLink to={`/materiau/${materiau.url}`}>
                        <div className='materiau-container'>
                            <h2>{materiau.titre}</h2>
                            <div className='article-info-container'>
                                <p>par {materiau.auteur}</p>
                                {materiau.traducteur && <p>traduit de {materiau.langueOriginale}</p>}
                                {materiau.traducteur && <p>par {materiau.traducteur}</p>}
                                <p>{materiau.date}</p>
                            </div>
                            <div className='numeros-text-card'>
                                {presentation && documentToReactComponents(materiau.presentation.json)}
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
                    </AniLink>}):
                    <p>Il n'y a pas de matériaux pour cet article...</p>
                    }
                </div>
            </div>
            

        </Layout>
    )
}


export const query = graphql`
query($url:String) {
    article1: contentfulArticleEnAccesLibre(url:{eq:$url}){ 
        titre
        auteur
        sousTitre
        presentation{json}
        photoPrincipale{fluid{...GatsbyContentfulFluid}}
        dateDePublication(formatString: "MMMM YYYY", locale: "fr")
        materiaux{
            titre
            auteur
            url
            dateDePublication
            presentation{json}
            traducteur
            langueOriginale
          }
    }
}
`


export default Materiau




