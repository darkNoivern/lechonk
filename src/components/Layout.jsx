import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import Calendar from './Calendar';
import Manage from './Manage';
import Add from './Add';
import '../styles/layout.css';
import { db } from "../firebase.config";
import Nonotebook from '../error/Nonotebook';
import Flipcards from './Flipcards';
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
    const [openStartCalendar, setOpenStartCalendar] = useState(false);
    const [openEndCalendar, setOpenEndCalendar] = useState(false);

    const [balance, setBalance] = useState(true);
    const [transactionTab, setTransactionTab] = useState(false);
    const [manage, setManage] = useState(false);
    const [add, setAdd] = useState(false);

    const defaultStart = new Date(1950, 0, 1, 0, 0, 0, 0);
    const defaultEnd = new Date(2050, 11, 31, 23, 59, 59, 999);
    const [startDate, setStartDate] = useState(defaultStart);
    const [endDate, setEndDate] = useState(defaultEnd);
    const [startChoosen, setStartChoosen] = useState(false);
    const [endChoosen, setEndChoosen] = useState(false);

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
                result[0].transactions.forEach((pay) => {
                    arr[0] += parseInt(pay.amount);
                })
                setTotal(arr[0])
            }
        });

    }, [currentUser]);

    useEffect(() => {
        if (notebook.length > 0) {
            setTransaction(
                notebook[0].transactions.filter((pay, index) => {
                    return ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)
                })
            )

            const arr = new Array(1).fill(0);
            notebook[0].transactions.forEach((pay) => {
                if (((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                    arr[0] += parseInt(pay.amount);
                }
            })
            setTotal(arr[0])
        }
    }, [startChoosen, endChoosen])

    // const spinner = (index) => {
    //     document.querySelectorAll(".sp-card")[index].classList.toggle("voltorb");
    // };

    const deleteTransaction = (index) => {
        // document.querySelectorAll('.sp-card')[index]?.forEach((element, i) => {
        //     element.classList.remove("voltorb")
        // })

        let setup = notebook[0];
        let arr = notebook[0].transactions;
        arr.splice(index, 1);
        setup.transactions = arr;
        setDoc(doc(db, `users/${currentUser.uid}/notebooks`, `${notebook[0].name}`), setup)
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

                            <div className="services__container mb-3 container grid layout__cards__container grid2">

                                <div className="flexy second__color p2">
                                    <div>
                                        <h2 className="section__title bigger__text">{notebookName.charAt(0).toUpperCase() + notebookName.slice(1)}</h2>
                                        <span className="section__subtitle less__margin__subtitle">{notebook[0].description.charAt(0).toUpperCase() + notebook[0].description.slice(1)}</span>
                                    </div>
                                </div>

                                <div className='flexy second__color p2'>
                                    <div>

                                        <h2 className="section__title fontWeightNormal">Timeline</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                                        <div className="services__container container grid">
                                            <div
                                                onClick={() => { setOpenStartCalendar(true); }}
                                                className="button calendar__open__button flexy">
                                                {!startChoosen ? "Start Date" : `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}
                                            </div>
                                            <div
                                                onClick={() => { setOpenEndCalendar(true); }}
                                                className="button calendar__open__button flexy">
                                                {!endChoosen ? "End Date" : `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}
                                            </div>
                                        </div>
                                        {
                                            openStartCalendar &&
                                            <Calendar
                                                setType={"start"}
                                                setDate={setStartDate}
                                                setChoosen={setStartChoosen}
                                                setCalendar={setOpenStartCalendar} />
                                        }

                                        {
                                            openEndCalendar &&
                                            <Calendar
                                                setType={"end"}
                                                setDate={setEndDate}
                                                setChoosen={setEndChoosen}
                                                setCalendar={setOpenEndCalendar} />
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
                                                    <>
                                                        {(!(index !== 0 && ((transaction[index].date === transaction[index - 1].date) && (transaction[index].month === transaction[index - 1].month) && (transaction[index].year === transaction[index - 1].year))) &&
                                                            <div className="flexy mt1">
                                                                {`${element.date}/${element.month + 1}/${element.year}`}
                                                            </div>
                                                        )}

                                                        <div className="flexy">
                                                            <Flipcards element={element} index={index} deleteTransaction={deleteTransaction} />

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                }
                                {
                                    manage &&
                                    <>
                                        <Manage
                                            transaction={transaction}
                                            notebook={notebook[0]} />
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