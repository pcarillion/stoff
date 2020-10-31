import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'

import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import BackgroundImage from 'gatsby-background-image'

const getData = graphql`
query {
	numeros: allContentfulNumeroDeLaRevue(sort:{fields:numero, order:DESC}){ 
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

    const [numberDisplayed, setNumberDisplayed] = useState(0)

    const handleChange = e => {
        var numberToDisplay = e.target.value;
        for (let i = 0; i < numeros.edges.length; i ++) {
            if (numeros.edges[i].node.numero == numberToDisplay) {
                setNumberDisplayed(i)
            }
        }
    }

    return (
        <Layout>
            <section className='numeros-left-section'>
                <div className='numeros-presentation'>
                    {documentToReactComponents(numeros.edges[numberDisplayed].node.presentation.json)} 
                    <select id='select-numero' onChange={handleChange}>
                        {numeros.edges.map((numero, i) => {
                            return <option key={i} value={numero.node.numero}>Numéro {numero.node.numero}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p>
                    Commander le numéro
                    </p>
                </div>
            </section>
            <section className='numeros-right-section'>
                {numeros.edges[numberDisplayed].node.articles.map((article, i) => {
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
