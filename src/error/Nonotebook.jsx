import React from 'react'
import '../styles/error.css'
import lechonk from '../img/pokemon-lechonk.webp'
import { Link } from 'react-router-dom'

const Nonotebook = () => {
    return (
        <>
            <section className="balance section">
                <div className="services__container container grid flexy">
                    <div>
                        <img src={lechonk} alt="" />
                        <div className="error">
                            Achoo !! This notebook is not present
                            <br />
                            But you can make one here
                            <br />
                            <Link
                            exact to="/notebooks" 
                            className="button error__buttons">
                            Make One
                            <i className='uil uil-arrow-right'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Nonotebook