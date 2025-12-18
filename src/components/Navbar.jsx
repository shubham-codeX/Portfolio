import React from 'react'
import { navIcons, navLinks } from '#constants';
import dayjs from 'dayjs';

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
    <div>
        <ul>
            {navIcons.map(({id, img}) => (
                <li key={id}>
                    <img src={img} className='icon-hover' alt={`icon-${id}`}/>
                </li>
            ))}
        </ul>
        <time className='text-white font-normal'>{dayjs().format('ddd D MMM  h:mm A')}</time>
    </div>
  </nav>
}

export default Navbar


