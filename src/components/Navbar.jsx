import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {

    // const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'

    const themeChange = () => {
        document.body.classList.toggle(darkTheme)
        console.log(document.querySelector('.change-theme'))
        document.querySelector('.change-theme').classList.toggle('uil-moon')
        document.querySelector('.change-theme').classList.toggle('uil-sun')
    }

    /*==================== REMOVE MENU MOBILE ====================*/
    const linkAction = () => {
        const navMenu = document.getElementById('nav-menu')
        console.log(navMenu, 'clicked')
        navMenu.classList.remove('show-menu')
    }

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <Link to='/' className="nav__logo flexy">
                <img className='nav__logo-img' src="https://www.serebii.net/art/th/915.png" alt="" />
                Expen$e Tracker
                </Link>
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeclassname="active"
                                exact
                                to="/"
                                className="nav__link">
                                <i class="uil uil-estate nav__icon"></i>Home
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeclassname="active"
                                exact
                                to="/notebook"
                                className="nav__link">
                                <i class="uil uil-notes nav__icon"></i>Notebook
                            </NavLink>
                        </li>
                        
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeClass="active"
                                exact
                                to="/balance"
                                className="nav__link">
                                <i class="uil uil-balance-scale nav__icon"></i>Balance
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeClass="active"
                                exact
                                to="/manage"
                                className="nav__link">
                                <i class="uil uil-pizza-slice nav__icon"></i>Manage
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeClass="active"
                                exact
                                to="/contact"
                                className="nav__link">
                                <i class="uil uil-message nav__icon"></i>Contact Me
                            </NavLink>
                        </li>

                    </ul>

                    <i
                        onClick={() => {
                            document.getElementById('nav-menu').classList.remove('show-menu')
                        }}
                        className="uil uil-times nav__close" id="nav-close"></i>
                </div>
                <div className="nav__btns">
                    <i
                        onClick={() => { themeChange(); }}
                        className="uil uil-sun change-theme" id="theme-button"></i>
                    <div
                        onClick={() => {
                            document.getElementById('nav-menu').classList.add('show-menu')
                        }}
                        className="nav__toggle" id="nav-toggle">
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar