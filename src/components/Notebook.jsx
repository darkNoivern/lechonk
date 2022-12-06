import React, { useState } from 'react'
import '../styles/notebook.css'

const Notebook = () => {

    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [current, setCurrent] = useState("");

    const submitCategory = () => {
        setCategories(categories => [...categories, current])
        setCurrent("");
    }

    const delCategory = (index) => {
        const arr = categories.filter((category, i) => {
            return (i !== index);
        });
        setCategories(arr);
    }

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
                                    <div className="services__modal-content notebook__modal-content">
                                        <h4 className="services__modal-title">
                                            New <br /> Notebook
                                        </h4>
                                        <i
                                            onClick={() => {
                                                setOpenModal(false);
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
                                            Add max 7 extra categories
                                            <div className="category__storage grid">
                                                {
                                                    categories.map((category, index) => {
                                                        return (
                                                            <>
                                                                <span className='category__span' key={index}>
                                                                    {category}
                                                                    <i
                                                                        onClick={() => { delCategory(index) }}
                                                                        class="uil uil-times firstColor"></i></span>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <span className='category__span'>Others</span>
                                            
                                            </div>

                                            <div className="grid grid2">
                                                <div className='services__form-content'>

                                                    <label for="" className="services__label">Add Categories</label>
                                                    <input
                                                        value={current}
                                                        onChange={(event) => { setCurrent(event.target.value) }}
                                                        className='services__input' type="text" />
                                                </div>
                                                <span
                                                    onClick={() => { submitCategory(); }}
                                                    className='flexy button'>Add</span>
                                            </div>
                                            <span className="flexy button">Submit</span>
                                        </form>

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