import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'

const Materiau = ({data}) => {


    
    const {article1, article2} = data   

    let article = article1 ?  article1 : article2
    
    const options = {
        renderNode: {
          [INLINES.HYPERLINK]: (node) => {
            if((node.data.uri).includes("player.vimeo.com/video")){
                return <span className="video-container"><iframe title="Unique Title 001" src={node.data.uri} frameBorder="0" allowFullScreen></iframe></span>
            } else if((node.data.uri).includes("youtube.com/embed")) {
              return <span className="video-container"><iframe title="Unique Title 002" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen></iframe></span>
            } else {
                return <strong><a href={node.data.uri}>{node.content[0].value}</a></strong>
            }
          }
        }
      }
    return (
        <Layout>
            <SEO title={'Matériaux | ' + article.titre}/>
            <div className='materiaux-container'>
                <h1>Matériaux pour " {article.titre} "</h1>
                <div>
                    {article.materiaux ?
                    article.materiaux.map((materiau, i) => {
                        return <a href={`/materiau/${materiau.url}`}>
                        <div className='materiau-container'>
                            <h2>{materiau.titre}</h2>
                            <div className='article-info-container'>
                            <p>par <span className='uppercase'>{materiau.auteur}</span></p>
                                {materiau.traducteur && <p>traduit {materiau.langueOriginale}</p>}
                                {materiau.traducteur && <p>par {materiau.traducteur}</p>}
                                <p>{materiau.date}</p>
                            </div>
                            <div className='numeros-text-card'>
                                {materiau.presentation && documentToReactComponents(materiau.presentation.json, options)}
                            </div>
                            <p className='text-materiaux'>Lire l'article</p>
                            <div className='text-filter'></div>
                            <div className='right-info-container'>
                            <p>par <span className='uppercase'>{materiau.auteur}</span></p>
                                {materiau.traducteur && <p>traduit {materiau.langueOriginale}</p>}
                                {materiau.traducteur && <p>par {materiau.traducteur}</p>}
                                <p>{materiau.date}</p>
                            </div>
                        </div>
                    </a>}):
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
    article2: contentfulArticleSansAccesLibre(url:{eq:$url}){ 
        titre
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




