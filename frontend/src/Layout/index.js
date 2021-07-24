import React from 'react';
import Nav from '../pages/Nav';

import useAuth from '../hooks/useAuth';

import './styles.css';


const Layout = ({ children }) => {

    const { signed, user } = useAuth();

    return (

        <div >
            <header>
                <Nav/>
            
            </header>
            
            <main>
            
                { children }
            
            </main>
        </div>
    )
}

export default Layout;