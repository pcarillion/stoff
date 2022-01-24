import React, { useState, useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"
import ProductCard from "./ProductCard"
import getStripe from "../../utils/stripejs"



const Products = ({add_item}) => {

    // console.log("hey")


     

  return ( <></>
    // <StaticQuery
    //         query={graphql`
    //           query ProductPrices {
    //             prices: allStripePrice(
    //               filter: { active: { eq: true } }
    //               sort: { fields: [unit_amount] }
    //               ) {
    //                 edges {
    //                   node {
    //                     id
    //                     active
    //                     currency
    //                     unit_amount
    //                     product {
    //                       id
    //                       name
    //                       images
    //                       metadata {
    //                           is_numero
    //                           ISBN
    //                           pages
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           `}
    // render={({ prices }) => {
    //     // Group prices by product
    //     const products = {}
    //     for (const { node: price } of prices.edges) {
    //       const product = price.product
    //       if (!products[product.id]) {
    //         products[product.id] = product
    //         products[product.id].prices = []
    //       }
    //       products[product.id].prices.push(price)
    //     }
    //     return (
    //       <div>
    //         {Object.keys(products).map(key => (
    //           <ProductCard key={products[key].id} product={products[key]} callback={add_item} />
    //         ))}
            
    //       </div>
    //     )
    //   }}
    // />
  )
}

export default Products