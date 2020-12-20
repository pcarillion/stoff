import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import Materiaux from '../components/materiaux'

const ArticleBlocked = ({data}) => {
    const {titre, auteur, dateDePublication, sousTitre, presentation, materiaux} = data.article
    
    return (
        <Layout>
            <SEO title={titre}/>
            <div className='article-container'>
                <h2>{titre}</h2>
                {materiaux && <a className='materiaux-link' href='#materiaux'>Matériaux associés</a>}
                <div className='article-info-container'>
                    <p>par {auteur}</p>
                    <p>{dateDePublication}</p>
                </div>
                <div className='article-pres'>
                    {presentation && documentToReactComponents(presentation.json)}
                </div>
            <div className='article-content'>
            <br/>
                Cet article n’est pas encore en accès libre. Pour le lire, on peut acheter ce numéro de la revue en libraire ou <AniLink to='/commande'>le commander en ligne</AniLink>.
            </div>
            </div>
            <div id='materiaux'></div>
            {materiaux && <Materiaux materiaux={materiaux}/>}
        </Layout>
    )
}


export const query = graphql`
query($url:String) {
    article: contentfulArticleSansAccesLibre(url:{eq:$url}){ 
        titre
        auteur
        sousTitre
        presentation{json}
        dateDePublication(formatString: "MMMM YYYY", locale: "fr")
        materiaux{
            titre
            auteur
            dateDePublication
            presentation{json}
            traducteur
            langueOriginale
            url
          }
    }
}
`


export default ArticleBlocked
