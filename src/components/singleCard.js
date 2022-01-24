import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import BackgroundImage from 'gatsby-background-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types'


const SingleCard = ({article, i, numero}) => {
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


      let the_article = article.node? article.node : article

      const translateTypeName = (typename, article) => {
        if (typename === "ContentfulAuFilDeLeau") {
            return 'Au fil de l\'eau';
        } else if (typename === "ContentfulArticleEnAccesLibre") {
            return 'Article en accès libre';
        } else if (typename === "ContentfulMateriau") {
            return 'Materiau pour "' + article[0].titre + '"';
        }
      }

      const getURL = (typename) => {
        if (typename === "ContentfulAuFilDeLeau") {
            return 'au-fil';
        } else if (typename === "ContentfulArticleEnAccesLibre") {
            return 'article';
        } else if (typename === "ContentfulMateriau") {
            return 'materiau';
        }
      }

      return (
        <AniLink className='numeros-article-card' key={i} to={numero?`/numeros/article/${the_article.url}`:`/${getURL(the_article.__typename)}/${the_article.url}`}>
                    {!numero && <h5>{translateTypeName(the_article.__typename, the_article.article)}</h5>}
                    <div className="numero-all-text-content">
                        <h3>{the_article.titre}</h3>
                        {numero && <h4>{the_article.sousTitre}</h4>}
                        {the_article.extrait &&
                            <div className='numeros-text-card'>
                                {documentToReactComponents(the_article.extrait.json, options)} 
                                {the_article.materiaux && <AniLink to={`materiaux/${the_article.url}`} className='text-materiaux'>Matériaux associés</AniLink>}
                            </div>}
                        {the_article.prsentationDuTexte && <div className='numeros-text-card' dangerouslySetInnerHTML={{__html : the_article.prsentationDuTexte.childMarkdownRemark.html}}></div>}
                        
                    </div>
                    {the_article.image && <BackgroundImage className='numeros-image-card' fluid={the_article.image.fluid}><div><h3 className={'mobile_title'}>{the_article.titre}</h3></div></BackgroundImage>}
        </AniLink>
    )
}

export default SingleCard
