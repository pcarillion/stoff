import React, {useState, useEffect} from 'react'
import Products from '../components/Products'
import '../components/stripe.css'
import getStripe from "../../utils/stripejs"
import Panier from "../components/Panier"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "../components/ProductCard"
import "../components/commande.css"
import SEO from '../components/SEO'
import AniLink from 'gatsby-plugin-transition-link/AniLink'


const buttonStyles = {}


const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
}

const getData = graphql`
    query ProductPrices {
    prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
        ) {
        edges {
            node {
            id
            active
            currency
            unit_amount
            product {
                id
                name
                images
                metadata {
                    is_numero
                    ISBN
                    pages
                }
            }
            }
        }
        }
    }
    `

const Commandebis = () => {
  const [loading, setLoading] = useState(false)
  const {prices} = useStaticQuery(getData);
  const products = {}
  for (const { node: price } of prices.edges) {
    const product = price.product
    if (!products[product.id]) {
      products[product.id] = product
      products[product.id].prices = []
    }
    products[product.id].prices.push(price)
  }

  
    const [items, setItems] = useState({});
    const [fraisDePort, setFraisDePort] = useState([]);

    let fraisDePortUn
    let fraisDePortPlusieurs
    for (const [key, value] of Object.entries(products)) {
      if (value.name == "frais de port (1 numéro)") {
        fraisDePortUn = value.prices[0];
      }
      if (value.name == "frais de port (3+ numéros)") {
        fraisDePortPlusieurs = value.prices[0];
      }
    }

    const add_item = async (id, qty, name, price) => {
           setItems(
             {
               ...items, 
               [id]: [qty, name, price]
         })
       }

       const delete_item = (id) => {
         let newObject = {}
        for (const [key, value] of Object.entries(items)) {
          if (key !== id) {
            newObject[key] = value
          }
        }
        setItems(newObject)
       }

       useEffect(() => {
         let numberOfItems = 0;
         for (const [key, value] of Object.entries(items)) {
          // console.log(`${key}: ${value}`);
          numberOfItems += value[0];
        }
        if (numberOfItems == 0) {
          setFraisDePort(0)
        } else if (numberOfItems == 1 || numberOfItems == 2) {
          setFraisDePort([fraisDePortUn.id ,fraisDePortUn.unit_amount, numberOfItems])
        } else if (numberOfItems > 2) {
          setFraisDePort([fraisDePortPlusieurs.id, fraisDePortPlusieurs.unit_amount, 1])
        }
       }, [items])

    const handleSubmit = async event => {
        event.preventDefault()
        setLoading(true)

        // console.log("items",items)
        // console.log("frais de port",fraisDePort)

        let lineItems = [];

        Object.keys(items).map(key => {
          lineItems.push({price: key, quantity: parseInt(items[key][0])})
          // console.log(key)
          // console.log({price: key, quantity: items[key][0]})
        })

        let fraisDePortId = fraisDePort[0]
        lineItems.push({price: fraisDePortId, quantity: parseInt(fraisDePort[2])})


        // console.log(lineItems)
        // return;

        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
          mode: "payment",
          lineItems: lineItems,
          successUrl: `https://www.stoff.fr//confirmation-commande`,
          cancelUrl: `https://www.stoff.fr//annulation-commande`,
          shippingAddressCollection: {allowedCountries:['FR', 'GB', 'DE', 'BE', 'CA', 'CH', 'US', 'IT', 'ES', 'SE']}
        })
    
        if (error) {
          console.warn("Error:", error)
          setLoading(false)
        }
      }


    return (
        <div className="command-page">
        <SEO title={'commande'}/>
          <div className="command-nav">
            <div>
              <div><AniLink to="/">Retour</AniLink></div>
              <h1>Commander un numéro</h1>
            </div>
            <div className="frais-de-port-info">
              Frais de port : 2 euros par exemplaire et tarif unique à 5 euros à partir de 3 exemplaires
            </div>
          </div>
          <div className="command-card-container">
            {Object.keys(products).map(key => (
              <>{products[key]['metadata']['is_numero'] && <ProductCard items={items} key={products[key].id} product={products[key]} callback={add_item} />}</>
            ))}
          </div>
            <form onSubmit={handleSubmit} className="panier">
              <div className="panier-title">
                  Panier
              </div>
              <div className="panier-content">
                {fraisDePort.length >0 ?
                <div className="panier-full"><Panier items={items} products={products} fraisDePort={fraisDePort} callback={delete_item}/>
                <button
                  disabled={loading}
                  style={
                      loading
                      ? { ...buttonStyles, ...buttonDisabledStyles }
                      : buttonStyles
                  }
                  className='btn-checkout'
                  onClick = {() => console.log(items)}
                  >
                  PAYER
                  </button></div>: 
                  <div>Tous nos produits sont actuellement en rupture de stock. Nous sommes désolés.</div>}
                </div>
              </form>
        </div>
    )
}

export default Commandebis
