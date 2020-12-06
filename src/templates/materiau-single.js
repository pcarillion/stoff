import React from 'react'
import Layout from '../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import SEO from '../components/SEO'

const MateriauSingle = ({data}) => {
    const {titre, auteur, dateDePublication, sousTitre, presentation, image, texte, traducteur, langueOriginale} = data.materiau
    

    
    return (
        <Layout>
            <SEO title={'Materiau | ' + titre}/>
            <div className='article-container'>
                <h2>{titre}</h2>
                <div className='article-info-container'>
                    <p>par <span className='uppercase'>{auteur}</span></p>
                    {langueOriginale && <p>traduit de {langueOriginale}</p>}
                    {traducteur && <p>par {traducteur}</p>}
                    <p>{dateDePublication}</p>
                </div>
                <p className='article-pres'>{documentToReactComponents(presentation.json)} </p>
                <div className='article-content'>
                    {documentToReactComponents(texte.json)} 
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
    materiau: contentfulMateriau(url:{eq:$url}){ 
        titre
        sousTitre
        auteur
        dateDePublication(formatString: "MMMM YYYY", locale: "fr")
        presentation{json}
        image {fluid{...GatsbyContentfulFluid}}
        texte {json}
        traducteur
        langueOriginale
    }
}
`


export default MateriauSingle
