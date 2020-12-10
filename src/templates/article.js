import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'

import Materiaux from '../components/materiaux'

const Article = ({data}) => {
    const {titre, auteur, dateDePublication,notesDeBasDePage, sousTitre, presentation, photoPrincipale, article, materiaux} = data.article
    const options = {
        renderNode: {
          [INLINES.HYPERLINK]: (node) => {
            if((node.data.uri).includes("player.vimeo.com/video")){
                return <span className="video-container"><iframe title="Unique Title 001" src={node.data.uri} frameBorder="0" allowFullScreen></iframe></span>
            } else if((node.data.uri).includes("youtube.com/embed")) {
              return <span className="video-container"><iframe title="Unique Title 002" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen></iframe></span>
            }
          }
        }
      }

    console.log(article)
    return (
        <Layout>
            <SEO title={titre}/>
            <div className='article-container'>
                <h2>{titre}</h2>
                <a className='materiaux-link' href='#materiaux'>Matériaux associés</a>
                <div className='article-info-container'>
                    <p>par {auteur}</p>
                    <p>{dateDePublication}</p>
                </div>
                <div className='article-pres'>
                    {presentation && documentToReactComponents(presentation.json)}
                </div>
                <div className='article-content'>
                    {documentToReactComponents(article.json, options)} 
                    <div className='article-au-fil-image-container'>
                        {photoPrincipale && <Img className='article-au-fil-image' fluid={photoPrincipale.fluid}/>}
                    </div>
                </div>
            </div>
            <div id='materiaux'></div>
            {materiaux && <Materiaux materiaux={materiaux}/>}
        </Layout>
    )
}


export const query = graphql`
query($url:String) {
    article: contentfulArticleEnAccesLibre(url:{eq:$url}){ 
        titre
        auteur
        sousTitre
        presentation{json}
        photoPrincipale{fluid{...GatsbyContentfulFluid}}
        dateDePublication(formatString: "MMMM YYYY", locale: "fr")
        article{json}
        notesDeBasDePage{
            titre
            text {json}
            numro
        }
        materiaux{
            titre
            auteur
            dateDePublication
            presentation{json}
            traducteur
            langueOriginale
          }
    }
}
`


export default Article
