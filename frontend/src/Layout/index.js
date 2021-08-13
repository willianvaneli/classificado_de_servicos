import React from 'react';
import Nav from '../pages/Nav';

import './styles.css';


const Layout = ({ children }) => {

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