import React, { useState } from 'react'
import '../styles/notebook.css'
const Notebook = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <section className="section">
                <h2 className="section__title">Notebooks</h2>
                <span className="section__subtitle">Get in touch</span>
                <div className="contact__container container grid">
                    <div>
                        <div className="services__content">
                            <div>
                                <i className="uil uil-notes services__icon"></i>
                                <h3 className="services__title">Daily <br /> Expenses</h3>
                            </div>
                            <span
                                className="button button--flex button--small button--link services__button">
                                View More
                                <i className="uil uil-arrow-right button__icon"></i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="services__content">
                            <div>
                                <i className="uil uil-notes services__icon"></i>
                                <h3 className="services__title">Daily <br /> Expenses</h3>
                            </div>
                            <span
                                className="button button--flex button--small button--link services__button">
                                View More
                                <i className="uil uil-arrow-right button__icon"></i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="services__content">
                            <div>
                                <i className="uil uil-create-dashboard services__icon"></i>
                                <h3 className="services__title">Add <br /> Notebook</h3>
                            </div>
                            <span
                                onClick={() => { setOpenModal(true); }}
                                className="button button--flex button--small button--link services__button">
                                Add
                                <i className="uil uil-arrow-right button__icon"></i>
                            </span>
                            {
                                openModal &&
                                <div className="services__modal">
                                    <div className="services__modal-content">
                                        <h4 className="services__modal-title">
                                            New <br /> Notebook
                                        </h4>
                                        <i
                                            onClick={() => {
                                                setOpenModal(false);
                                                console.log('frontend')
                                            }}
                                            className="uil uil-times services__modal-close"></i>
                                        <form action="" className="services__form grid">
                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Name</label>
                                                <input type="text" className="services__input" />
                                            </div>
                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Description</label>
                                                <input type="text" className="services__input" />
                                            </div>
                                        </form>
                                        {/* <ul className="services__modal-services grid">

                                            <li className="services__modal-service">
                                                <i className="services__modal-icon uil uil-check-circle"></i>
                                                <p>I design & develop the interface.</p>
                                            </li>

                                            <li className="services__modal-service">
                                                <i className="services__modal-icon uil uil-check-circle"></i>
                                                <p>I use modern framework ReactJS to make dynamic websites.</p>
                                            </li>

                                            <li className="services__modal-service">
                                                <i className="services__modal-icon uil uil-check-circle"></i>
                                                <p>Have experience using many frameworks and packages to make the website lively.</p>
                                            </li>

                                        </ul> */}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notebook