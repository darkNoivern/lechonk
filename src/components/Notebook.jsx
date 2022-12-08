import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/notebook.css'
import { auth, db, storage } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

const Notebook = () => {

    const { currentUser } = useContext(AuthContext)

    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [current, setCurrent] = useState("");
    const [notebookName, setNotebookName] = useState("");
    const [notebookDescription, setNotebookDescription] = useState("");
    const [notebooks, setNotebooks] = useState([]);

    const [error, setError] = useState(false);

    const [notebookError, setNotebookError] = useState(false);

    const blogsCollectionRef = collection(db, `users/${currentUser.uid}/notebooks`);
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));

    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setNotebooks(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    });

    function isCategory(str) {
        return /^[a-z ]+$/i.test(str)
    }

    function isAlpha(str) {
        return /^[a-z]+$/i.test(str)
    }

    //  add 
    const addNotebook = (event) => {

        event.preventDefault();

        if (!isAlpha(notebookName)) {
            setNotebookError(true);
            return;
        }
        const submitCategoryArray = categories;
        submitCategoryArray.push("others")
        setCategories(categories => [...categories, "others"])
        const docRef = doc(db, `users/${currentUser.uid}/notebooks/${notebookName}`);
        setDoc(docRef, {
            name: notebookName,
            description: notebookDescription,
            categories: submitCategoryArray,
            transactions: [],
            createdAt: serverTimestamp(),
        })

        const notebookRef = doc(db, `users/${currentUser.uid}`);
        updateDoc(notebookRef, {
            notebooks: arrayUnion(`${notebookName}`)
        })

        setNotebookName("");
        setNotebookDescription("");
        setCategories([]);
        setCurrent("");
        setOpenModal(false);

    }

    const submitCategory = () => {
        if (!categories.includes(current)) {
            if (isCategory(current)) {
                setCategories(categories => [...categories, current])
            }
            else {
                setError(true);
            }
        }
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

                    {
                        notebooks.map((notebooki, index) => {
                            return (
                                <div key={index}>
                                    <div className="services__content">
                                        <div>
                                            <i className="uil uil-notes services__icon"></i>
                                            <h3 className="services__title">{notebooki.name.charAt(0).toUpperCase() + notebooki.name.slice(1)}<br /> Expenses</h3>
                                        </div>
                                        <Link
                                            to={`/notebook/${currentUser.displayName}/${notebooki.name}`}
                                            className="button button--flex button--small button--link services__button">
                                            View More
                                            <i className="uil uil-arrow-right button__icon"></i>
                                        </Link>
                                    </div>
                                </div>

                            )
                        })
                    }

                    <div>
                        <div className="services__content">
                            <div>
                                <i className="uil uil-create-dashboard services__icon"></i>
                                <h3 className="services__title">Add <br /> Notebook</h3>
                            </div>
                            <span
                                onClick={() => {
                                    setOpenModal(true);
                                    setCurrent("");
                                    setCategories([]);
                                    setNotebookName("");
                                    setNotebookDescription("");
                                }}
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
                                                setCurrent("");
                                                setCategories([]);
                                                setNotebookName("");
                                                setNotebookDescription("");
                                            }}
                                            className="uil uil-times services__modal-close"></i>
                                        <form onSubmit={addNotebook} className="services__form grid">


                                            {
                                                notebookError &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Only alphabetic letters allowed
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setNotebookError(false);
                                                                setNotebookError("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }

                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Name</label>
                                                <input
                                                    required
                                                    value={notebookName}
                                                    onChange={(event) => { setNotebookName(event.target.value).toLowerCase() }}
                                                    type="text" className="services__input" />
                                            </div>
                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Description</label>
                                                <input
                                                    required
                                                    value={notebookDescription}
                                                    onChange={(event) => { setNotebookDescription(event.target.value) }}
                                                    type="text" className="services__input" />
                                            </div>

                                            <div className="info">
                                                <i class="uil uil-user-exclamation info__icon"></i> You can add max 7 extra categories
                                            </div>

                                            {
                                                error &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Only alphabetic letters and spaces allowed
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setError(false);
                                                                setCurrent("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }

                                            <div className="category__storage grid">
                                                {
                                                    categories.map((category, index) => {
                                                        return (
                                                            <>
                                                                <span className='category__span' key={index}>
                                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
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
                                                        onChange={(event) => { setCurrent(event.target.value).toLowerCase() }}
                                                        className='services__input' type="text" />
                                                </div>
                                                <span
                                                    onClick={() => { submitCategory(); }}
                                                    className='flexy button'>Add</span>
                                            </div>
                                            <button className="flexy notebook__submit button">Submit</button>
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