import React from 'react';
import Head from './Head';
import Menu from './Menu';
import Subscribe from './Subscribe';
import Footer from './Footer';

function Container({children}) { 
    return(
        <div className="Container">
            <Head />
            <Menu />
            {children}
            <Subscribe />
            <Footer />
        </div>
    )
 }

export default Container;