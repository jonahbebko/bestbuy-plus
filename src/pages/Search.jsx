import { useState } from 'react'
import './Search.css'

// this page shows a header at the top with a search bar containing the submitted info from the App page
// and a list of products below it

function Search() {
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedQuery(searchQuery)
    // fetch products from bestbuy api
    const endpoint = `https://api.bestbuy.com/v1/products(search=${searchQuery}*)?apiKey=HXpcTnUYOlZ68rx118Hc0pi2&format=json`
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setProducts([])
      })
  }

  return (
    <>
      <p>
        Search Page
      </p>
    </>
  )
}

export default Search