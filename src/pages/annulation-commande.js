import React from 'react'
import Layout from '../components/Layout'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'

const ConfirmationCommande = () => {
    return (
        <Layout>
                <SEO title={'Commande'}/>
            <p className='commande-temporaire'>
            La procédure de paiement a été interrompue. <AniLink to="/commande"> <strong>Vous pouvez réessayer l'opération sans attendre, si vous le souhaitez.</strong>  </AniLink>          
            <div><AniLink to='/'>Retour</AniLink></div>
            </p>
        </Layout>
    )
}

export default ConfirmationCommande
