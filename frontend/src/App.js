import React from "react";
import styled from "styled-components";

//import { Homepage, Navbar, Dashboard, Insure } from './components'
import { Homepage } from './components/Homepage';
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { Apply } from './components/Apply';
import { Insure } from './components/Insure';

import { Routes , Route, Link } from 'react-router-dom';

const FullApp = styled.div`
    height: max;
    width: max;
`;

export function App () {
    return(
        <div>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path='/' element={<Homepage />} />
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/apply' element={<Apply />} />
                    <Route exact path='/insure' element={<Insure />} />
                </Routes>
            </div>
            
        </div>
    )
}