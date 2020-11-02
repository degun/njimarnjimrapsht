import React from 'react';
import Qilim from './Head/Qilim/Qilim';
import Subhead from './Head/Subhead/Subhead';
import './Head.sass';

function Head(){
    return(
        <header className="Head">
            <Qilim />
            <Subhead />
        </header>
    )
}

export default Head;