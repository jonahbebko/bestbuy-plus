import { useState } from 'react'
import Header from '../components/Header'

function Search() {

  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  const queryParams = new URLSearchParams(window.location.search)
  const query = queryParams.get('query') || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedQuery(searchQuery)
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
      <Header />
      <div class='flex flex-col grow items-center justify-center'>
        <p>Search page for {query}</p>
      </div>
    </>
  )
}

export default Search