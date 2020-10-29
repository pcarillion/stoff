import React from 'react'

import Layout from '../components/Layout'

import {graphql, useStaticQuery} from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';



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

  return (
    <Layout>
      <div className={'home-presentation'}>
        {documentToReactComponents(presentation.presentation.json)} 
      </div>
    </Layout>
  )
}



export default Home
