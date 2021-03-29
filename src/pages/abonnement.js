import React from 'react'
import Layout from '../components/Layout'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'

const Abonnement = () => {
    return (
        <Layout>
                <SEO title={'Commande'}/>
            <p className='commande-temporaire'>
            Notre page de commande est en construction, mais vous pouvez écrire à <strong>contact@stoff.fr</strong> pour commander le premier numéro de la revue.
            <br/>Prix unitaire : 10 euros. Frais de port par exemplaire : 2 euros (France ou international), avec un rabais à partir de 3 exemplaires commandés.  
            <br/>Précisez le nombre d'exemplaires souhaité, votre nom et votre adresse.
            <div><AniLink to='/'>Retour</AniLink></div>
            </p>
        </Layout>
    )
}

export default Abonnement
