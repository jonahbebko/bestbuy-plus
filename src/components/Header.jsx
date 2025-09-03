import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // If input is all digits, treat as SKU
    if (/^\d{6,7}$/.test(searchQuery)) {
      navigate(`/product?sku=${searchQuery}`)
    } else if ((/^\d+$/.test(searchQuery))) {
      navigate(`/product?upc=${searchQuery}`)
    } else {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div class='flex flex-row p-3 gap-3 items-center bg-blue-800'>
      <img alt='logo' href='favicon.svg' onClick={() => navigate('/')}></img>
      <form class='flex grow gap-3' onSubmit={handleSubmit}>
        <input
          class='flex grow rounded-full px-4 py-2 bg-[#1a1a1a]'
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search products or enter SKU'
        />
        <button
          class='m-0 rounded-full bg-[#1a1a1a]'
          type='submit'>
            Search
        </button>
      </form>
    </div>
  )
}

export default Header