import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'

const Article = ({data}) => {
    const {titre, auteur, dateDePublication, sousTitre, presentation, photoPrincipale, article} = data.article
    

    
    return (
        <Layout>
            <div className='article-container'>
                <h2>{titre}</h2>
                <div className='article-info-container'>
                    <p>par {auteur}</p>
                    <p>{dateDePublication}</p>
                </div>
                <div className='article-pres'>
                    {presentation && documentToReactComponents(presentation.json)}
                </div>
                <div className='article-content'>
                    {documentToReactComponents(article.json)} 
                    <div className='article-au-fil-image-container'>
                        {photoPrincipale && <Img className='article-au-fil-image' fluid={photoPrincipale.fluid}/>}
                    </div>
                </div>
            </div>
            

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
    }
}
`


export default Article
