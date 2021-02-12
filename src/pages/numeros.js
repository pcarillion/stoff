import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import AllNumeros from '../components/AllNumeros'
import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import BackgroundImage from 'gatsby-background-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'
import { INLINES } from '@contentful/rich-text-types'

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
            materiaux{
                titre
            }
            extrait{json}
            photoPrincipale {
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

    numeros.edges.forEach(numero => {
        console.log(numero)
    })
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
        console.log('clicked')
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
                        <p onClick={close}>Retour à la liste des numéros</p>
                    </div>
                </section>
                <section className='numeros-right-section'>
                    {numeros.edges[numberDisplayed].node.articles && numeros.edges[numberDisplayed].node.articles.map((article, i) => {
                        if (article.titre !== 'trame') {
                            return <AniLink className='numeros-article-card' key={i} to={`/numeros/article/${article.url}`}>
                                        {article.image && <BackgroundImage className='numeros-image-card' fluid={article.image.fluid}><div><h3 className={'mobile_title'}>{article.titre}</h3></div></BackgroundImage>}
                                        <div className="numero-all-text-content">
                                            <h3>{article.titre}</h3>
                                            <h4>{article.sousTitre}</h4>
                                            <div className='numeros-text-card'>
                                                {documentToReactComponents(article.extrait.json, options)} 
                                                {article.materiaux && <AniLink to={`materiaux/${article.url}`} className='text-materiaux'>Matériaux associés</AniLink>}
                                            </div>
                                        </div>
                            </AniLink>
                        }
                    })}
                    {numeros.edges[numberDisplayed].node.articlesEnAccesLibre && numeros.edges[numberDisplayed].node.articlesEnAccesLibre.map((article, i) => {
                        if (article.titre !== 'trame') {
                        return <AniLink className='numeros-article-card' key={i} to={`/article/${article.url}`}>
                                    {article.photoPrincipale && <BackgroundImage className='numeros-image-card' fluid={article.photoPrincipale.fluid}/>}
                                    <div className="numero-all-text-content">
                                        <h3>{article.titre}</h3>
                                        <h4>{article.sousTitre}</h4>
                                        <div className='numeros-text-card'>
                                            {documentToReactComponents(article.extrait.json, options)} 
                                            {article.materiaux && <AniLink to={`materiaux/${article.url}`} className='text-materiaux'>Matériaux associés</AniLink>}
                                        </div>
                                    </div>
                        </AniLink>}
                    })}
                </section>
            </div>
        </Layout>
    )
}

export default Numeros
