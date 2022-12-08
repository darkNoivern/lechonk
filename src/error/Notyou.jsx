import React from 'react'
import '../styles/error.css'
import lechonk from '../img/pokemon-lechonk.webp'
import { Link } from 'react-router-dom'

const Notyou = () => {
    return (
        <>
            <section className="balance section">
                <div className="services__container container grid flexy">
                    <div>
                        <img src={lechonk} alt="" />
                        <div className="error">
                            Grr!! Grr!! This notebook is not yours
                            <br />
                            Please return pal
                            <br />
                            <Link
                            exact to="/notebooks" 
                            className="button error__buttons">
                                Return 
                                <i className='uil uil-arrow-right'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notyou