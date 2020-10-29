import React from 'react'

import Layout from '../components/Layout'

import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import BackgroundImage from 'gatsby-background-image'

const getData = graphql`
query {
	numeros: allContentfulNumeroDeLaRevue{ 
  	edges{ 
    	node {
        numero
        presentation {json}
        articles{
          titre
          sousTitre
          dateDePublication
          presentation{json}
          image {
            fluid {
                ...GatsbyContentfulFluid
              }
          }
        }
      }
    }
  }
}
`

const Numeros = () => {

    const {numeros} = useStaticQuery(getData);

    console.log(numeros)

    return (
        <Layout>
            <section className='numeros-left-section'>
                <div className='numeros-presentation'>
                    {documentToReactComponents(numeros.edges[0].node.presentation.json)} 
                </div>
                <p>
                    Commander le numéro
                </p>
            </section>
            <section className='numeros-right-section'>
                {numeros.edges[0].node.articles.map((article, i) => {
                    console.log(article)
                    return <div className='numeros-article-card' key={i}>
                                {article.image && <BackgroundImage className='numeros-image-card' fluid={article.image.fluid}/>}
                                <h3>{article.titre}</h3>
                                <h4>{article.sousTitre}</h4>
                                <div className='numeros-text-card'>
                                    {documentToReactComponents(numeros.edges[0].node.presentation.json)} 
                                </div>
                    </div>
                })}
            </section>
        </Layout>
    )
}

export default Numeros
