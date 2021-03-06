import React from "react";
import styled from "styled-components";

//import { Homepage, Navbar, Dashboard, Insure } from './components'
import { Homepage } from './components/Homepage';
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { Apply } from './components/Apply';
import { Insure } from './components/Insure';

import { Routes , Route, Link } from 'react-router-dom';
import { InsurePolicy } from "./components/InsurePolicy";

const FullApp = styled.div`
    height: 100vh;
    background-color: white;
`

export function App () {
    return(
        <FullApp>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path='/' element={<Homepage />} />
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/apply' element={<Apply />} />
                    <Route exact path='/insure' element={<Insure />} />
                    <Route exact path='/insure/:address' element={<InsurePolicy />} />
                </Routes>
            </div>
        </FullApp>
    )
}