import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import AllNumeros from '../components/AllNumeros'
import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'
import SingleCard from '../components/singleCard'

const getData = graphql`
query {
	numeros: allContentfulNumeroDeLaRevue(sort:{fields:numero, order:DESC}){ 
  	edges{ 
    	node {
        numero
        presentation {json}
        themes {json}
        image {
            fluid {
                ...GatsbyContentfulFluid
              }
          }
        dateDePublication(formatString: "YYYY")
        articles{
            titre
            url
            sousTitre
            dateDePublication
            __typename
            materiaux{
                titre
            }
            extrait{json}
            image {
              fluid {
                  ...GatsbyContentfulFluid
                }
            }
          }
        articlesEnAccesLibre{
            url
            titre
            sousTitre
            dateDePublication
            __typename
            materiaux{
                titre
            }
            extrait{json}
            image:photoPrincipale {
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
    const [numberDisplayed, setNumberDisplayed] = useState(0)
    const [oneNumberDisplayed, setOneNumberDisplayed] = useState(false)
    const [trameUrl, setTrameUrl] = useState('')


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

    const handleChange = (numberToDisplay) => {
        for (let i = 0; i < numeros.edges.length; i ++) {
            if (numeros.edges[i].node.numero == numberToDisplay) {
                setNumberDisplayed(i)
            }
        }
        setOneNumberDisplayed(oneNumberDisplayed => !oneNumberDisplayed)
    }

    function close() {
        // setNumberDisplayed(0)
        setOneNumberDisplayed(oneNumberDisplayed => !oneNumberDisplayed)
    }

    const oneNumeroDisplay= {
        display: 'none'
    }
    if (oneNumberDisplayed) {
        oneNumeroDisplay.display = 'block';
    } else {
        oneNumeroDisplay.display = 'none'
    }


    useEffect(() => {
        for (let x = 0; x < numeros.edges[numberDisplayed].node.articlesEnAccesLibre.length; x++){
            if (numeros.edges[numberDisplayed].node.articlesEnAccesLibre[x].titre === 'trame') {
                setTrameUrl(numeros.edges[numberDisplayed].node.articlesEnAccesLibre[x].url)
            }
        }
    }, [numberDisplayed])

    return (
        <Layout>
            <SEO title={'Numéros'}/>
            <AllNumeros numeros={numeros} callback={handleChange} state={oneNumberDisplayed}/>
            <div className='one-numero-container' style={oneNumeroDisplay}>
                <section className='numeros-left-section'>
                    <div className='numeros-presentation'>
                        <AniLink to={`/article/${trameUrl}`}>
                            {documentToReactComponents(numeros.edges[numberDisplayed].node.presentation.json, options)} 
                        </AniLink>
                        {/* <select id='select-numero' onChange={handleChange}>
                            {numeros.edges.map((numero, i) => {
                                return <option key={i} value={numero.node.numero}>Numéro {numero.node.numero}</option>
                            })}
                        </select> */}
                    </div>
                    <div>
                        <AniLink to='/commande'>
                            <p>Commander le numéro</p>
                        </AniLink>
                        <p onClick={close} class="back-numero-desktop">Retour à la liste des numéros</p>
                    </div>
                </section>
                <section className='numeros-right-section'>
                    {numeros.edges[numberDisplayed].node.articles && numeros.edges[numberDisplayed].node.articles.map((article, i) => {
                        if (article.titre !== 'trame') {
                            return <SingleCard article={article} i={i} numero={true}/>
                        }
                    })}
                    {numeros.edges[numberDisplayed].node.articlesEnAccesLibre && numeros.edges[numberDisplayed].node.articlesEnAccesLibre.map((article, i) => {
                        if (article.titre !== 'trame') {
                            return <SingleCard article={article} i={i} numero={true}/>
                        }
                    })}
                <p onClick={close} class="back-numero-mobile">Retour à la liste des numéros</p>
                </section>

            </div>
        </Layout>
    )
}

export default Numeros
