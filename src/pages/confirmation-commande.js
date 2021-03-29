import React from 'react'
import Layout from '../components/Layout'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from '../components/SEO'

const AnnulationCommande = () => {
    return (
        <Layout>
                <SEO title={'Commande'}/>
                <p className='commande-temporaire'>
            Vous recevrez le numéro dans les délais les plus courts possibles. Les commandes étant préparées par nos soins, il faut compter entre deux et trois jours entre réception du paiement et expédition par voie postale. La durée d'expédition varie selon les pays. Bonne lecture !
            <div><AniLink to='/'>Retour</AniLink></div>
            </p>
        </Layout>
    )
}

export default AnnulationCommande
