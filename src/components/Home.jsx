import React from 'react'
import lechonk from '../img/pokemon-lechonk.webp'
import '../styles/home.css'

const Home = () => {
    return (
        <>
            <section className="section">
                <div className="container style__home grid home__container">
                    <div className='flexy home_container_dialogue'>
                        Money moves from those who don't manage it to those who do;
                    </div>
                    <div className="flexy">

                    <div className="goldenLeafContainer">
                        <img src={lechonk} alt="" />
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home