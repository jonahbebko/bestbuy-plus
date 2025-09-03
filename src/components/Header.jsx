import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((/^\d{7,8}$/.test(searchQuery))) {
      navigate(`/product?sku=${searchQuery}`)
    } else {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className='flex flex-row p-3 gap-3 items-center bg-blue-800'>
      <img alt='logo' href='favicon.svg' onClick={() => navigate('/')}></img>
      <form className='flex grow gap-3' onSubmit={handleSubmit}>
        <input
          className='flex grow rounded-full px-4 py-2 bg-[#1a1a1a]'
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search products or enter SKU'
        />
        <button
          className='m-0 rounded-full bg-[#1a1a1a]'
          type='submit'>
            Search
        </button>
      </form>
    </div>
  )
}

export default Header