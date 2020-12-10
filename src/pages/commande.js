import React from 'react'
import Layout from '../components/Layout'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'

const commande = () => {
    return (
        <Layout>
                <SEO title={'Commande'}/>
            <p className='commande-temporaire'>
            Notre page de commande est en construction. En attendant, écrivez à <strong>contact@stoff.fr</strong> pour commander la revue, en précisant le nombre d'exemplaires souhaité, votre nom, adresse, ainsi qu'un numéro de téléphone (ce dernier est indispensable pour les envois vers certains pays européens par Mondial Relay).
            <div><AniLink to='/'>Retour</AniLink></div>
            </p>
        </Layout>
    )
}

export default commande
