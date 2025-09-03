import { useState } from 'react'
import Header from '../components/Header'

function Product() {

  const [productResult, setProductResult] = useState(null)
  const [error, setError] = useState(null)

  const queryParams = new URLSearchParams(window.location.search)
  const sku = queryParams.get('sku') || ''
  const upc = queryParams.get('upc') || ''

  const getProductFromSKU = (sku) => {
    const endpoint = `https://api.bestbuy.com/v1/products/${sku}.json?apiKey=HXpcTnUYOlZ68rx118Hc0pi2`
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setProductResult(data)
        setError(null)
      })
      .catch((error) => {
        setProductResult(null)
        setError('Error fetching product data')
      })
  }

  return (
    <>
      <Header />
      <div class='flex flex-col grow items-center justify-center'>
        <p>Product page for {sku || upc}</p>
      </div>
    </>
  )
}

export default Product