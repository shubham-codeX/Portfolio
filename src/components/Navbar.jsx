import React from 'react'
import { navLinks } from '#constants/index.js'

const Navbar = () => {
  return <nav>
    <div>
        <img src="/images/logo.svg" alt="Logo"/>
        <p className='font-bold text-white'>Shubham's Portfolio</p>

        <ul>
      {navLinks.map(({ id, name }) => (
        <li key={id}>
          <p>{name}</p>
        </li>
      ))}
        </ul>
    </div>
  </nav>
}

export default Navbar


