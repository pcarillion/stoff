import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import LieuxDistrib from '../components/LieuxDistrib'
import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import AniLink from 'gatsby-plugin-transition-link/AniLink'



import stoffLogo from '../img/logo-small.png';
import fbLogo from '../img/facebook.png';
import twitterLogo from '../img/twitter.png';

import useActualites from '../hooks/use-actualites'

import Actualites from '../components/Actualites'


const getData = graphql`
query{
	presentation: contentfulPresentation(isOnline:{eq:true}){
    id
    presentation {
      json
    }
  }
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

const Home = () => {

  const {presentation, articles} = useStaticQuery(getData);
  const [displayed, setDisplayed] = useState('actualites')

  let presentationStyle = {
    transition: 'all linear 0.3s'
  }
  let presentationTitle = {    
    transition: 'all linear 0.3s'
  }
  let lieuxDistribTitle = {    
    transition: 'all linear 0.3s'
  }
  let  lieuxDistribStyle = {
    transition: 'all linear 0.3s'
  }
  let actualitesTitle = {    
    transition: 'all linear 0.3s'
  }
  let  actualitesStyle = {
    transition: 'all linear 0.3s'
  }

  if (displayed === 'presentation') {
    presentationStyle.opacity = 1;
    presentationTitle.color = '#B8860B';
    lieuxDistribTitle.color = 'black';
    lieuxDistribStyle.opacity = 0;
    lieuxDistribStyle.display = "none";
    presentationStyle.display = "block";
    actualitesStyle.display = "none";
    actualitesStyle.opacity = 0;
    actualitesTitle.color = 'black';
  } else if (displayed === 'lieux de distribution') {
    presentationStyle.opacity = 0;
    presentationTitle.color = 'black'
    lieuxDistribTitle.color = '#B8860B'
    lieuxDistribStyle.opacity = 1;
    lieuxDistribStyle.display = "block";
    presentationStyle.display = "none";
    actualitesStyle.display = "none";
    actualitesStyle.opacity = 0;
    actualitesTitle.color = 'black';
  } else if (displayed === 'actualites') {
    presentationStyle.opacity = 0;
    presentationTitle.color = 'black'
    presentationStyle.display = "none";
    lieuxDistribTitle.color = 'black';
    lieuxDistribStyle.opacity = 0;
    lieuxDistribStyle.display = "none";
    actualitesStyle.display = "block";
    actualitesStyle.opacity = 1;
    actualitesTitle.color = '#B8860B';
  }

  function setPresentation(){
    setDisplayed('presentation')
  }
  function setLieuxDistrib(){
    setDisplayed('lieux de distribution')
  }

  function setActualites(){
    setDisplayed('actualites')

  }

  // let actualites = articles.edges.map(article => article.node)

    let articlesList = useActualites();
    console.log(articlesList)

  return (
    <Layout>
      <div className={'home-container'}>
        <div className={'home-presentation'}>
          <div style={presentationStyle}>{documentToReactComponents(presentation.presentation.json)}</div> 
          <div style={lieuxDistribStyle}><LieuxDistrib/></div>
          <div style={actualitesStyle}><Actualites articles={articlesList}/></div>
        </div>
        <div className={"side-links"}>
          <div className='logos-div'>
            <a href='https://twitter.com/revuestoff'><img src={twitterLogo} alt="stoff" id='fb-logo'/></a>
            <a href='https://www.facebook.com/revuestoff'><img src={fbLogo} alt="stoff" id='fb-logo'/></a>
            <img src={stoffLogo} alt="stoff" id='logo-stoff'/>
          </div>
          <p style={actualitesTitle} onClick={() => {setActualites(); window.scrollTo(0, 0)}}>Actualités</p>
          <p style={presentationTitle} onClick={() => {setPresentation(); window.scrollTo(0, 0)}}>Présentation</p>
          <p style={lieuxDistribTitle} onClick={() => {setLieuxDistrib(); window.scrollTo(0, 0)}}>Lieux de distribution</p>
          <p><AniLink to='/commande'>Commande en ligne</AniLink></p>
          {/* <p><AniLink to='/commande'>Abonnement / don</AniLink></p> */}
        </div>
      </div>
    </Layout>
  )
}



export default Home
