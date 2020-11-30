import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import LieuxDistrib from '../components/LieuxDistrib'
import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import AniLink from 'gatsby-plugin-transition-link/AniLink'



import stoffLogo from '../img/logo-big.webp';
import fbLogo from '../img/facebook-log.png';
import twitterLogo from '../img/twitter-logo.png';



const getData = graphql`
query{
	presentation: contentfulPresentation(isOnline:{eq:true}){
    id
    presentation {
      json
    }
  }

}
`

const Home = () => {

  const {presentation} = useStaticQuery(getData);
  const [displayed, setDisplayed] = useState('presentation')

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

  if (displayed === 'presentation') {
    presentationStyle.opacity = 1;
    presentationTitle.color = '#B8860B';
    lieuxDistribTitle.color = 'black';
    lieuxDistribStyle.opacity = 0;
    lieuxDistribStyle.display = "none";
    presentationStyle.display = "block";

  } else if (displayed === 'lieux de distribution') {
    presentationStyle.opacity = 0;
    presentationTitle.color = 'black'
    lieuxDistribTitle.color = '#B8860B'
    lieuxDistribStyle.opacity = 1;
    lieuxDistribStyle.display = "block";
    presentationStyle.display = "none";


  }

  function setPresentation(){
    setDisplayed('presentation')
  }
  function setLieuxDistrib(){
    setDisplayed('lieux de distribution')
  }

  return (
    <Layout>
      <div className={'home-container'}>
        <div className={'home-presentation'}>
          <div style={presentationStyle}>{documentToReactComponents(presentation.presentation.json)}</div> 
          <div style={lieuxDistribStyle}><LieuxDistrib/></div>
        </div>
        <div className={"side-links"}>
          <div className='logos-div'>
            <img src={twitterLogo} alt="stoff" id='fb-logo'/>
            <img src={fbLogo} alt="stoff" id='fb-logo'/>
            <img src={stoffLogo} alt="stoff" id='logo-stoff'/>
          </div>
          <p style={presentationTitle} onClick={setPresentation}>Présentation</p>
          <p style={lieuxDistribTitle} onClick={setLieuxDistrib}>Lieux de distribution</p>
          <p><AniLink to='/commande'>Commande en ligne</AniLink></p>
          <p><AniLink to='/commande'>Abonnement / don</AniLink></p>
        </div>
      </div>
    </Layout>
  )
}



export default Home
