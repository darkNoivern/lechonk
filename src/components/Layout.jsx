import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import Calendar from './Calendar';
import Manage from './Manage';
import Add from './Add';
import '../styles/layout.css';
import { db } from "../firebase.config";
import Nonotebook from '../error/Nonotebook';
import Notyou from '../error/Notyou';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";


const NewBalance = () => {

    //  auth 
    const { currentUser } = useContext(AuthContext);

    //  params
    const parameter = useParams();
    const username = parameter.username;
    const notebookName = parameter.notebook;

    //  passing props
    const [notebook, setNotebook] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [total, setTotal] = useState(0);

    //  segments
    const [openCalendar, setOpenCalendar] = useState(false);
    const [balance, setBalance] = useState(true);
    const [transactionTab, setTransactionTab] = useState(false);
    const [manage, setManage] = useState(false);
    const [add, setAdd] = useState(false);


    const notebooksCollectionRef = collection(db, `users/${currentUser.uid}/notebooks`);

    useEffect(() => {

        onSnapshot(notebooksCollectionRef, (snapshot) => {
            const notebooks = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })

            const result = notebooks.filter((element, index) => {
                return (element.name === notebookName);
            })

            setNotebook(result)
            if (result.length > 0) {
                setTransaction(result[0].transactions)
                
                const arr = new Array(1).fill(0);
                result[0].transactions.forEach((transaction) => {
                    arr[0] += parseInt(transaction.amount);
                })
                setTotal(arr[0])
            }
        });

    });
    const spinner = (index) => {
        document.querySelectorAll(".sp-card")[index].classList.toggle("voltorb");
    };

    const deleteTransaction = (index) => {

        let setup = notebook[0];
        let arr = notebook[0].transactions;
        arr.splice(index, 1);
        setup.transactions = arr;
        setDoc(doc(db, `users/${currentUser.uid}/notebooks`, `${notebook[0].name}`), setup)
        document.querySelectorAll('.sp-card').forEach((element, i) => {
            element.classList.remove("voltorb")
        })
    }

    return (
        <>
            {
                (username !== currentUser.displayName) ?
                    <Notyou />
                    :

                    notebook.length === 0 ?
                        <Nonotebook /> :

                        <section className="balance section">

                            <div className="services__container mb-3 container grid grid2">
                                <div className="flexy second__color p2">
                                    <div>
                                        <h2 className="section__title bigger__text">{notebookName.charAt(0).toUpperCase() + notebookName.slice(1)}</h2>
                                        <span className="section__subtitle less__margin__subtitle">{notebook[0].description}</span>
                                    </div>
                                </div>

                                <div className='flexy second__color p2'>
                                    <div>

                                        <h2 className="section__title fontWeightNormal">Timeline</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                                        <div className="services__container container grid">
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
                                        setTransactionTab(false);
                                        setManage(false);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button left__curve ${balance ? "active__button" : "body__background"}`}>
                                    Balance
                                </button>
                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(true);
                                        setManage(false);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button ${transactionTab ? "active__button" : "body__background"}`}>
                                    Transaction
                                </button>
                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(false);
                                        setManage(true);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button ${manage ? "active__button" : "body__background"}`}>
                                    Manage
                                </button>

                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(false);
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
                                                        <h3 className=" flexy services__title">Rs<br />{total}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                }

                                {
                                    transactionTab &&
                                    <>
                                        <h2 className="section__title">Transactions</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of past transactions here</span>

                                        {
                                            transaction.map((element, index) => {
                                                return (
                                                    <div className="flexy">
                                                        <div className="balance__transaction__content poke">
                                                            <div
                                                                onClick={() => { spinner(index); }}
                                                                className="transaction__card sp-card">
                                                                <div className="main__card front">
                                                                    <div className='transaction__ transaction__top'>
                                                                        <i
                                                                            onClick={() => { deleteTransaction(index) }}
                                                                            class="uil uil-trash-alt delete__button"></i>
                                                                        <div className="category-style flexy py-1 px-2">
                                                                            <div className={`pokemon-tag mx-2`}></div>
                                                                            <div>{element.category}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='transaction__ transaction__back'>
                                                                        <span>{element.reason}</span>
                                                                        <span>₹ {element.amount}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="main__card back">
                                                                    {element.description}
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                )
                                            })
                                        }
                                    </>
                                }
                                {
                                    manage &&
                                    <>
                                        <Manage notebook={notebook[0]} />
                                    </>
                                }
                                {
                                    add && <>
                                        <Add uid={currentUser.uid} notebook={notebook[0]} />
                                    </>
                                }
                            </div>
                        </section>
            }

        </>
    )
}

export default NewBalance