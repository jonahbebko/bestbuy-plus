import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './Home.css'

function Home() {
  return (
    <div className='flex flex-col h-screen grow'>
      <Header />
      <div className='flex flex-col grow gap-5 items-center justify-center'>
        <div className='flex flex-row gap-5 items-center'>
          {/* <img alt='logo' href='favicon.svg'/> */}
          <h1>bestbuy-plus</h1>
        </div>
        <p>
          description description description!!!
        </p>
      </div>
    </div>
  )
}

export default Home
