import React from 'react'
import Navbar from './Navbar'
import Home from './Home';
import Notebook from './Notebook';
import Contact from './Contact';
import Balance from './Balance';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Index = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/notebook" element={<Notebook />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/balance" element={<Balance />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index