import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'

const AufilArticle = ({data}) => {
    const {titre, auteur, date, sousTitre, prsentationDuTexte, image, article, traducteur, langueOriginale} = data.articleAuFil
    
    const options = {
        renderNode: {
          [INLINES.HYPERLINK]: (node) => {
            if((node.data.uri).includes("player.vimeo.com/video")){
                return <span><iframe title="Unique Title 001" src={node.data.uri} frameBorder="0" allowFullScreen></iframe></span>
            } else if((node.data.uri).includes("youtube.com/embed")) {
              return <span><iframe title="Unique Title 002" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen></iframe></span>
            }
          }
        }
      }
    
    return (
        <Layout>
            <SEO title={titre}/>
            <div className='article-container'>
                <h2>{titre}</h2>
                <div className='article-info-container'>
                    <p>par {auteur}</p>
                    <p>traduit de {langueOriginale}</p>
                    <p>par {traducteur}</p>
                    <p>{date}</p>
                </div>
                <p className='article-pres' dangerouslySetInnerHTML={{__html : prsentationDuTexte.childMarkdownRemark.html}}></p>
                <div className='article-content'>
                    {documentToReactComponents(article.json, options)} 
                    <div className='article-au-fil-image-container'>
                        {image && <Img className='article-au-fil-image' fluid={image.fluid}/>}
                    </div>
                </div>
            </div>
            

        </Layout>
    )
}


export const query = graphql`
query($url:String) {
    articleAuFil: contentfulAuFilDeLeau(adresseUrl:{eq:$url}){ 
        titre
        auteur
        date(formatString: "MMMM YYYY", locale: "fr")
        sousTitre
        prsentationDuTexte{
            childMarkdownRemark{
                html
          }
        }
        image {fluid{...GatsbyContentfulFluid}}
        article {json}
        traducteur
        langueOriginale
    }
}
`


export default AufilArticle
