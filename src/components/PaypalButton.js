import React from "react"
import Paypal from "gatsby-plugin-paypal"

const PaylpalButton = (amount) => (

    console.log(amount)
    <Paypal 
      style={{
        shape: 'rect',
        color: 'blue',
        layout: 'horizontal',
        label: 'paypal',
      }}
      amount={amount}
      currency="EUR"
    />
)

export default PaylpalButton