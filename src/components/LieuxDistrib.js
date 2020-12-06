import React, {useState, useEffect} from 'react'




import {graphql, useStaticQuery} from "gatsby"

const getData = graphql`
query {
    France:allContentfulLibrairie(filter:{pays:{eq:"France"}}){
      edges{
        node{
          ville
          nom
          rue
        }
      }
    }
    Suisse:allContentfulLibrairie(filter:{pays:{eq:"Suisse"}}){
      edges{
        node{
          ville
          nom
          rue
        }
      }
    }
    Belgique:allContentfulLibrairie(filter:{pays:{eq:"Belgique"}}){
      edges{
        node{
          ville
          nom
          rue
        }
      }
    }
    Allemagne:allContentfulLibrairie(filter:{pays:{eq:"Allemagne"}}){
      edges{
        node{
          ville
          nom
          rue
        }
      }
    }
  }
`

const LieuxDistrib = () => {

    const {France, Suisse, Allemagne, Belgique} = useStaticQuery(getData);


    const [country, setCountry] = useState('France')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const [librairies, setLibrairies] = useState([])


    function getCitiesList(country) {
        let citiesArray = []
        for (let i =0; i < country.edges.length; i ++){
            if (!citiesArray.includes(country.edges[i].node.ville)) {
                citiesArray.push(country.edges[i].node.ville)
            }
        }
        citiesArray = citiesArray.sort()
        return citiesArray
    }
    
    let FranceCities = getCitiesList(France)
    let SuisseCities = getCitiesList(Suisse)
    let AllemagneCities = getCitiesList(Allemagne)
    let BelgiqueCities = getCitiesList(Belgique)
    let librairiesList = []



    useEffect(() => {
        let countriesList = document.querySelectorAll('.country')

        for (let i = 0; i < countriesList.length; i ++) {
            countriesList[i].addEventListener('click', function() {
                setCountry(countriesList[i].innerHTML)
            })
        }



    }, [])

    
    useEffect(() => {
        setLibrairies([])
        if (country === 'France') {
            setCities(FranceCities);
        } else if (country === 'Suisse') {
            setCities(SuisseCities)
        } else if (country === 'Allemagne') {
            setCities(AllemagneCities)
        } else if (country === 'Belgique') {
            setCities(BelgiqueCities)
        }
    }, [country])
    
    useEffect(() => {

        if (country === 'France') {
            setCity('Paris');
        } else if (country === 'Suisse') {
            setCity('Genève')
        } else if (country === 'Allemagne') {
            setCity('Berlin')
        } else if (country === 'Belgique') {
            setCity('Bruxelles')
        }

        let citiesList = document.querySelectorAll('.city')
        
        for (let i = 0; i < citiesList.length; i ++) {
            citiesList[i].addEventListener('click', function() {
                setCity(citiesList[i].innerHTML)
            })
        }
    }, [cities])

    useEffect(() => {

        librairiesList = []

        if (country === 'France') {
            for (let i = 0; i < France.edges.length; i ++){
                if (city === France.edges[i].node.ville) {
                    librairiesList.push(France.edges[i].node)
                }
            }
            setLibrairies(librairiesList)

        } else if (country === 'Suisse') {

            for (let i = 0; i < Suisse.edges.length; i ++){
                if (city === Suisse.edges[i].node.ville) {
                    librairiesList.push(Suisse.edges[i].node)
                }
            }
            setLibrairies(librairiesList)
        } else if (country === 'Allemagne') {
            setCities(AllemagneCities)
        } else if (country === 'Belgique') {
            setCities(BelgiqueCities)
        }

    }, [city])



    return (
        <div>
            <div className='distrib-message'>
                Les mesures de confinement prises en Europe à partir de la fin du mois d’octobre 2020 nous ont empêché de poursuivre l’auto-diffusion du premier numéro de stoff dans certaines villes et pays que nous avions en ligne de mire. Cela dit, il est toujours possible de nous soutenir en commandant la revue sur ce site.
            </div>
            <div className="lieux-container">
                <ul className='countries-ul'>
                    {France.edges.length>0 && <li className={`country ${country == 'France' ? 'boldness' : ''}`}>
                        France
                    </li>}
                    {Suisse.edges.length>0 && <li className={`country ${country == 'Suisse' ? 'boldness' : ''}`}>
                        Suisse
                    </li>}
                    {Belgique.edges.length>0 && <li className={`country ${country == 'Belgique' ? 'boldness' : ''}`}>
                        Belgique
                    </li>}
                    {Allemagne.edges.length>0 && <li className={`country ${country == 'Allemagne' ? 'boldness' : ''}`}>
                        Allemagne
                    </li>}
                </ul>
                <ul className='cities-ul'>
                    {cities.map(thecity => {
                        return <li className={`city ${city == thecity? 'boldness': ''}`}>{thecity}</li>
                    })}
                </ul>
                <ul className='librairies-ul'>
                    {librairies.map(librairie => {
                            return <li className='city'>
                                        <strong>{librairie.nom}</strong> <br/>
                                        {librairie.rue}
                                    </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default LieuxDistrib
