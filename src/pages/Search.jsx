import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'

function Search() {

  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSearchQuery(searchParams.get('query') || '')
  }, [location.search])

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
      <div className='flex flex-col grow items-center justify-center'>
        <p>Search page for {searchQuery}</p>
      </div>
    </>
  )
}

export default Search