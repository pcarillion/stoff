import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Paypal from "gatsby-plugin-paypal"


const Paypalpage = () => {


    return (
        <div>
            <Paypal 
                style={{
                    shape: 'rect',
                    color: 'white',
                    layout: 'horizontal',
                    label: 'pay'
                }}
                amount={30}
                currency="EUR"
                />
        </div>
    )
}

export default Paypalpage
