import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa"
const Header = () => {
  return (
    <div className='Navbar'>
        <div className="logo">
            <h1> Cryptoverse </h1>
            <FaEthereum color='orange' size={"30"} />
        </div>
      <ul>
        <li> <Link to = '/'> Home </Link> </li>
        <li> <Link to = '/coins'> Coins </Link> </li>
      </ul>
    </div>
  )
}

export default Header
