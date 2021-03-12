import React, { useState, useEffect } from "react"




const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["fr-FR"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

const ProductCard = ({ product, callback, items }) => {

  const send_callback = () => {
          let qty = document.querySelector(`.qty-${product.prices[0].id}`)
          if (qty.value > 0) {
            callback(product.prices[0].id, qty.value, product.name,product.prices[0].unit_amount)
          }
    }

  function change_qty(value) {
    let basicValue = parseInt(document.querySelector(`.qty-${product.prices[0].id}`).value)
    if (value == 0) {
     basicValue -= 1
    } else if (value == 1) {
     basicValue += 1
    }
    document.querySelector(`.qty-${product.prices[0].id}`).value = basicValue
  }



  return (
      <div className="product-card">
        <h4>{product.name}</h4>
        <img src={product.images[0]} />
        <div className={'product-image'} style={{backgroundImage: `url(${product.images[0]})`}}></div>
        <p>
            {formatPrice(product.prices[0].unit_amount, product.prices[0].currency)}
        </p>
        <input style={{display: 'none'}}  name='priceSelect' value={product.prices[0].id}></input>

        <div className={'input-div'}>
            <div className="qty-inputs">
              <div onClick={() => change_qty(0)} className="qty-btns">-</div>
              <input type='number' value={items[product.prices[0].id] ? items[product.prices[0].id][0] : "0"} min="0" name='quantity' class={`qty-input qty-${product.prices[0].id}`} placeholder='0'/>
              <div onClick={() => change_qty(1)} className="qty-btns">+</div>
            </div>
        </div>

        <div className={`btn-add btn-add-${product.prices[0].id}`} onClick={() => send_callback()}>
            Ajouter au panier
        </div>
        
      </div>
  )
}

export default ProductCard