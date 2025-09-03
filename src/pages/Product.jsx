import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'

function Product() {

  const [productResult, setProductResult] = useState(null)
  const [error, setError] = useState(null)
  const [sku, setSku] = useState(null)
  const [avail, setAvail] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSku(searchParams.get('sku') || '')
  }, [location.search])

  const getProductFromSku = (sku) => {
    const endpoint = `http://localhost:5000/api/products/${sku}`
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setProductResult(data)
        console.log(data)
        setError(null)
      })
      .catch((error) => {
        setProductResult(null)
        setError('Error fetching product data')
      })
  }

  const isAvailableAt597 = (sku) => {
    const endpoint = `http://localhost:5000/api/products/${sku}/stores`
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.stores?.length) {setAvail(data.stores[0].storeID === '597')}
        else {setAvail(false)}
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching store availability:', error)
      })
  }

  useEffect(() => {
    if (sku) {
      setProductResult(getProductFromSku(sku))
      isAvailableAt597(sku)
    }
  }, [sku])

  return (
    <>
      <Header />

      <style>
        {`
          .productimage {
            width: 200px;
            height: 200px;
            object-fit: contain;
            align-self: center;
          }
        `}
      </style>

      <div className='flex flex-col grow gap-6 p-6 items-center justify-center'>
        {error && <p className="text-red-500">{error}</p>}
        {productResult && (
          <div className='flex flex-col grow gap-4'>
            <img className='productimage' src={productResult.image} height='300' width='300' alt={productResult.name} />
            <h2><strong>{productResult.name}</strong></h2>
            {/* <p>{productResult.longDescription.replace('&#8217;', '\'')}</p> */}
            <p>${productResult.salePrice}</p>
            {avail ? (
              <p className="text-green-500">In Stock at 597</p>
            ) : (
              <p className="text-red-500">Out of Stock at 597</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Product