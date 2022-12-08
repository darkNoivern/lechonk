import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from './Navbar'
import Home from './Home';
import Notebook from './Notebook';
import '../styles/balance.css'
import '../styles/calendar.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
const Index = () => {

    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to={`/login`} />;
        }

        return children;
    };

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/notebooks" element={currentUser ? <Notebook /> : <Login />} />
                    <Route exact path="/login" element={<Login />} />
                    {/* <Route exact path="/layout" element={<Layout />} /> */}
                    <Route exact path={`/notebook/:username/:notebook`} element={currentUser ? <Layout /> : <Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index