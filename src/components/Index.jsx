import React from 'react'
import Navbar from './Navbar'
import Home from './Home';
import Notebook from './Notebook';
import '../styles/balance.css'
import '../styles/calendar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
const Index = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/notebook" element={<Notebook />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/layout" element={<Layout />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index