import React, { useState } from 'react'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault();
            console.log(username,email,password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                const user = result.user;
                updateProfile(result.user, {
                    displayName: username,
                });
                console.log(result);
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // ..
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
                                onChange={(event)=>{setUsername(event.target.value);}} 
                                className='login__input' type="text" name="txt" placeholder='username' required="" />
                            </div>
                            <div className="flexy">
                                <input 
                                onChange={(event)=>{setEmail(event.target.value);}}
                                className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input 
                                onChange={(event)=>{setPassword(event.target.value);}}
                                className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button
                            className='login__button'>Sign Up</button>
                        </form>
                    </div>
                    <div className="login">
                        <form className='services__form'>
                            <label className='login__label' htmlFor="chk" aria-hidden="true">Login</label>
                            <div className="flexy">
                                <input className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button className='login__button'>Login</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login