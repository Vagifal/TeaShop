import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MainState } from '../../MainState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import './Header.css'

const Header = () => {
    const value = useContext(MainState)

    return (
        <header>
            <div className='menu'>
                <img src={Menu} alt='Menu' width='30' />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/' >Tea Shop</Link>
                </h1>
            </div>
            <ul>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/login'>Login or Register</Link></li>
                <li>
                    <img src={Close} alt='Close' width='30' />
                </li>
            </ul>
            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'>
                    <img src={Cart} alt='Cart' width='30' />
                </Link>
            </div>
        </header>
    )
};

export default Header;