import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [sku, setSku] = useState('')
  const [productResult, setProductResult] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // If input is all digits, treat as SKU
    if (/^\d+$/.test(sku)) {
      navigate(`/product?sku=${sku}`)
    } else {
      navigate(`/search?query=${encodeURIComponent(sku)}`)
    }
  }

  return (
    <>
      <h1 className='m-8'>bestbuy-plus</h1>
      <form onSubmit={handleSubmit}>
        <div className='sku-input-field'>
          <label className='sku-input-label' htmlFor='sku-search'>Enter a SKU or Product Name:</label>
          <input
            type='search'
            id='sku-search'
            placeholder='6553053 or "laptop"'
            name='q'
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <button type='submit'>Search</button>
        </div>
      </form>
    </>
  )
}

export default Home
