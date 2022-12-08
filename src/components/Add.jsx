import React, { useState, useEffect } from 'react'
import '../styles/add.css'
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
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

const Add = (props) => {

    const uid = props.uid;
    const notebook = props.notebook;
    // const [notebook, setNotebook] = useState([]);
    
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("others");
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);

    const addTransaction = (event) => {

        event.preventDefault();

        let setup = notebook;
        let arr = notebook.transactions;

        const date = new Date();
        const form = {
            category: category,
            reason: reason,
            amount: amount,
            description: description,
            fulldate: date,
            day: date.getDay(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
        arr.unshift(form);
        setup.transactions = arr;
        setDoc(doc(db, `users/${uid}/notebooks`, `${notebook.name}`), setup)
    }
    
    return (
        <>
            <h2 className="section__title">Add Transactions</h2>
            <span className="section__subtitle less__margin__subtitle">FIll details to add transactions</span>

            <div className="services__container add__container grid grid1 container marginBottom3">
                <div className='add__form'>
                    <form
                        onSubmit={addTransaction}
                        className="services__form">
                        <div class="dropdown mb1_5">
                            <span
                                onClick={() => { setShow(!show); }}
                                class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* Dropdown Button */}
                                {category}
                                
                            <i className={`uil uil-angle-down dropdown__arrow`}>
                            </i>
                            </span>

                            <ul
                                class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {
                                    show && ( notebook!==undefined ?
                                            notebook.categories.map((individualCategory, index) => {
                                                return (
                                                    <li onClick={() => { setCategory(individualCategory); setShow(false); }} className="dropdown-item">{individualCategory}</li>
                                                )
                                            })
                                            :
                                            <></>
                                    )
                                }
                            </ul>
                        </div>
                        <div class="services__form-content mb1_5">
                            <label for="" className="services__label">Amount</label>
                            <input 
                            value={amount}
                            onChange={(event) => { setAmount(event.target.value) }}
                            type="text" className="services__input" />
                        </div>

                        <div className='services__form-content mb1_5'>
                            <label for="" className="services__label">Crisp Reason</label>
                            <input
                            value={reason}
                            onChange={((event)=>{setReason(event.target.value)})} 
                            className='services__input' type="text" />
                        </div>
                        <div className='services__form-content mb1_5'>
                            <label for="" className="services__label">Description</label>
                            <input 
                            value={description}
                            onChange={((event)=>{setDescription(event.target.value)})} 
                            className='services__input' type="text" />
                        </div>
                        <button className="flexy notebook__submit button w100">Submit</button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Add