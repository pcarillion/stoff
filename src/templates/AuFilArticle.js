import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'

const AufilArticle = ({data}) => {
    const {titre, auteur, date, sousTitre, prsentationDuTexte, image, article, traducteur, langueOriginale, notesCritiques} = data.articleAuFil
    const images = data.images.edges
    const options = {
        renderNode: {
          [INLINES.HYPERLINK]: (node) => {
            if((node.data.uri).includes("player.vimeo.com/video")){
                return <span><iframe title="Unique Title 001" src={node.data.uri} frameBorder="0" allowFullScreen></iframe></span>
            } else if((node.data.uri).includes("youtube.com/embed")) {
              return <span><iframe title="Unique Title 002" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen></iframe></span>
            } else {
                return <strong><a href={node.data.uri}>{node.content[0].value}</a></strong>
            }
          },
          [INLINES.EMBEDDED_ENTRY]: node => {
              if (node.data.target.sys.contentType.sys.id === 'footnote') {
                  return <div className='footnote'>{documentToReactComponents(node.data.target.fields.text['en-US'])}</div>
              }
          },
          "embedded-asset-block":(node)=> {
            let file
            for (let i = 0; i < images.length; i ++){
              if (images[i].node.contentful_id === node.data.target.sys.contentful_id){
                file = images[i].node
              }
            }
            return (<div className="image-in-article" ><img src={file.file.url}/> <p>{file.description}</p></div>)
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
                    {langueOriginale && <p>traduit {langueOriginale}</p>}
                    {traducteur && <p>par {traducteur}</p>}
                    <p>{date}</p>
                </div>
                {image && <div className='article-au-fil-image-mobile'><Img  fluid={image.fluid}/></div>}
                <div className='article-pres' dangerouslySetInnerHTML={{__html : prsentationDuTexte.childMarkdownRemark.html}}></div>


                {notesCritiques && <div className='notes-critiques-container'>
                    <div className="notes-critiques" dangerouslySetInnerHTML={{__html : notesCritiques.childMarkdownRemark.html}}></div>
                    <div className='article-au-fil-image-container'>
                        {image && <Img className='article-au-fil-image' fluid={image.fluid}/>}
                    </div>
                </div>}
                <div className='article-content'>
                    {documentToReactComponents(article.json, options)} 
                    <div className='article-au-fil-image-container'>
                        {!notesCritiques && image && <Img className='article-au-fil-image' fluid={image.fluid}/>}
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
        notesCritiques {
                childMarkdownRemark{
                    html
                  }
        }
    }
    images: allContentfulAsset{
        edges{
          node{
            contentful_id
            id
            file{url}
            description
          }
        }
      }
}
`


export default AufilArticle
