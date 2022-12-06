import React, { useState } from 'react'
import Calendar from './Calendar';
import Flipcards from './Flipcards';
import Manage from './Manage'
import Add from './Add'
import '../styles/layout.css'

const NewBalance = () => {

    const [openCalendar, setOpenCalendar] = useState(false);
    const [balance, setBalance] = useState(true);
    const [transaction, setTransaction] = useState(false);
    const [manage, setManage] = useState(false);
    const [add, setAdd] = useState(false);

    return (
        <>
            <section className="balance section">

                <div className="services__container mb-3 container grid grid2">
                    <div className="flexy">
                        <div>
                            <h2 className="section__title bigger__text">Gifts</h2>
                            <span className="section__subtitle less__margin__subtitle">Notebook to record expenses for other people</span>
                        </div>
                    </div>

                    <div className='flexy'>
                        <div>

                            <h2 className="section__title fontWeightNormal">Timeline</h2>
                            <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                            <div className="services__container container grid marginBottom3">
                                <div
                                    onClick={() => { setOpenCalendar(true); }}
                                    className="button calendar__open__button">
                                    Start Date
                                </div>
                                <div
                                    onClick={() => { setOpenCalendar(true); }}
                                    className="button calendar__open__button">
                                    End Date
                                </div>
                            </div>
                            {
                                openCalendar &&
                                <div className="balance__modal">
                                    <div className='modify__calendar__container'>
                                        <div className="section__title">Choose Date</div>
                                        <div className="flexy">

                                            <Calendar />
                                        </div>
                                        <div className='calendar__button__container'>
                                            <button
                                                onClick={() => { setOpenCalendar(false); }}
                                                className="button custom__button">Submit</button>
                                            <button
                                                onClick={() => { setOpenCalendar(false); }}
                                                className="button custom__button">Close</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="tab__container container grid">

                    <button
                        onClick={() => {
                            setBalance(true);
                            setTransaction(false);
                            setManage(false);
                            setAdd(false);
                        }}
                        className={`button tab__button middle__button left__curve ${balance ? "active__button" : "body__background"}`}>
                        Balance
                    </button>
                    <button
                        onClick={() => {
                            setBalance(false);
                            setTransaction(true);
                            setManage(false);
                            setAdd(false);
                        }}
                        className={`button tab__button middle__button ${transaction ? "active__button" : "body__background"}`}>
                        Transaction
                    </button>
                    <button
                        onClick={() => {
                            setBalance(false);
                            setTransaction(false);
                            setManage(true);
                            setAdd(false);
                        }}
                        className={`button tab__button middle__button ${manage ? "active__button" : "body__background"}`}>
                        Manage
                    </button>

                    <button
                        onClick={() => {
                            setBalance(false);
                            setTransaction(false);
                            setManage(false);
                            setAdd(true);
                        }}
                        className={`button tab__button right__curve ${add ? "active__button" : "body__background"}`}>
                        Add
                    </button>
                </div>
                <div className='border__style'>
                    {
                        balance &&
                        <>

                            <h2 className="section__title">Balance</h2>
                            <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                            <div className="services__container container grid marginBottom3">
                                <div>
                                    <div className="balance__content">
                                        <div className='balance__padding'>
                                            <h4>Income</h4>
                                            <h3 className=" flexy services__title">Rs<br />20000</h3>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="balance__content">
                                        <div className='balance__padding'>
                                            <h4>Expense</h4>
                                            <h3 className=" flexy services__title">Rs<br />20000</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    }

                    {
                        transaction &&
                        <>
                            <h2 className="section__title">Transactions</h2>
                            <span className="section__subtitle less__margin__subtitle">Get details of past transactions here</span>

                            {
                                [...Array(10)].map((element, index) => {
                                    return (
                                        <div className="flexy">
                                            <Flipcards id={index} key={index} />
                                        </div>

                                    )
                                })
                            }
                        </>
                    }
                    {
                        manage &&
                        <>
                            <Manage />
                        </>
                    }
                    {
                        add && <>
                            <Add />
                        </>
                    }
                </div>
            </section>

        </>
    )
}

export default NewBalance