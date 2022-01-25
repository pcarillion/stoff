import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import { INLINES,BLOCKS } from '@contentful/rich-text-types'

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
            } else {
                return <strong><a href={node.data.uri}>{node.content[0].value}</a></strong>
            }
          },
          [INLINES.EMBEDDED_ENTRY]: node => {
              console.log(node.data.target.fields.text)
                if (node.data.target.sys.contentType.sys.id === 'footnote') {
                    return <div style={{position: 'absolute', left: '100%', width: '200px', paddingLeft: '50px'}}>{documentToReactComponents(node.data.target.fields.text['en-US'])}</div>
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
                {materiaux && <a className='materiaux-link' href='#materiaux'>Matériaux associés</a>}
                <div className='article-info-container'>
                    {sousTitre && <h3>{sousTitre}</h3>}
                    <p>par {auteur}</p>
                    <p>{dateDePublication}</p>
                </div>
                <div className='article-pres'>
                    {presentation && documentToReactComponents(presentation.json, options)}
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
        materiaux{
            titre
            auteur
            sousTitre
            dateDePublication
            presentation{json}
            traducteur
            langueOriginale
            url
          }
    }
}
`


export default Article
