import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import AniLink from 'gatsby-plugin-transition-link/AniLink'

import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import BackgroundImage from 'gatsby-background-image'


const getData = graphql`
query {
    articles: allContentfulAuFilDeLeau(sort:{fields:date, order:DESC}){ 
        edges{
        node{
          auteur
          date(formatString: "MMMM YYYY", locale: "fr")
          prsentationDuTexte {
            childMarkdownRemark{
                html
              }
          }
          titre
          sousTitre
          adresseUrl
          traducteur
          image{
            fluid{
                ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
const Aufildeleau = () => {

    const {articles} = useStaticQuery(getData);


    console.log(articles)

    return (
        <Layout>
        <SEO title={'Au fil de l\'eau'}/>
            <div className='au-fil-container'>
                {articles.edges.map((article, i) => {
                    return <AniLink key={i} to={`/au-fil/${article.node.adresseUrl}`}  className='au-fil-article-card'>
                        {article.node.image && <BackgroundImage className='au-fil-image-card' fluid={article.node.image.fluid}/>}
                        <h3>{article.node.titre}</h3>
                        <div className='au-fil-author-date' >
                            <p>par <span className='uppercase'>{article.node.auteur}</span></p>
                            <p>{article.node.date}</p>
                        </div>
                        <div className='au-fil-pres' dangerouslySetInnerHTML={{__html : article.node.prsentationDuTexte.childMarkdownRemark.html}}>
                        </div>
                    </AniLink>
                })}
            </div>
        </Layout>
    )
}

export default Aufildeleau
