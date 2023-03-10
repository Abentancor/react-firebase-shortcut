import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const LayoutPublic = () => {
  return (
    <div className='font-roboto bg-gradient-to-br from-rose-900 via-pink-700 to-rose-900 p-6 text-white'>
        <header className='mb-8 '>
            <Navbar/>
        </header>
        <main className='h-screen w-4/6 m-auto mb-8'>
            <Outlet/>
        </main>
        <footer className=''>
            <h6 className='font-bold text-white text-center p-2'>footer</h6>
        </footer>
    </div>
  )
}

export default LayoutPublic