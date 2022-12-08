import React, { useState } from 'react'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [email2, setEmail2] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault();
        console.log(username, email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                const user = result.user;
                updateProfile(result.user, {
                    displayName: username,
                });

                console.log(result);

                setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    displayName: username,
                    email,
                    notebooks: [],
                });

                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    const signin = (event) => {

        event.preventDefault();
        signInWithEmailAndPassword(auth, email2, password2)
            .then((result) => {
                // Signed in 
                const user = result.user;
                navigate("/notebooks");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <>
            <section className="section flexy">
                <div className="login__main">

                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="signup">
                        <form
                            onSubmit={signup}

                            className='services__form'>
                            <label className='login__label' htmlFor="chk" aria-hidden="true">Sign Up</label>
                            <div className="flexy">
                                <input
                                    value={username}
                                    onChange={(event) => { setUsername(event.target.value); }}
                                    className='login__input' type="text" name="txt" placeholder='username' required="" />
                            </div>
                            <div className="flexy">
                                <input
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value); }}
                                    className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value); }}
                                    className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button
                                className='login__button flexy'>Sign Up</button>
                        </form>
                    </div>
                    <div className="login">
                        <form onSubmit={signin}
                            className='services__form'>
                            <label className='login__label' htmlFor="chk" aria-hidden="true">Login</label>
                            <div className="flexy">
                                <input
                                    value={email2}
                                    onChange={(event) => { setEmail2(event.target.value); }}
                                    className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input
                                    value={password2}
                                    onChange={(event) => { setPassword2(event.target.value); }}
                                    className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button className='login__button flexy'>Login</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login