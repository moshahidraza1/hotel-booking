import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='mt-16 mx-10 mb-16 flex items-center justify-between'>
      <h1 className='font-semibold text-black/80 tracking-tight text-xl'>WildSpirit</h1>
      <ul className='hidden md:flex gap-10 text-black font-sans drop-shadow-amber-50 text-lg '>
        <Link href={'#rooms'}>Rooms</Link>
        <Link href={'#experiences'}>Experiences</Link>
        <Link href={'#contact'}>Contact</Link>
      </ul>
      
    </nav>
  )
}

export default NavBar
