import React from 'react'
import '../styles/error.css'
import lechonk from '../img/pokemon-lechonk.webp'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <section className="balance section">
                <div className="services__container container grid flexy">
                    <div>
                        <img src={lechonk} alt="" />
                        <div className="error">
                            Achoo !! You arrived at wrong page pal
                            <br />
                            But you can return from here safely
                            <br />
                            <Link
                            exact to="/" 
                            className="button error__buttons">
                                Go Back
                                <i className='uil uil-arrow-right'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error