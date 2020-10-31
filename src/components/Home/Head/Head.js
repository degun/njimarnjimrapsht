import React from 'react';
import Qilim from './Qilim/Qilim';
import Subhead from './Subhead/Subhead';
import Menu from './Menu/Menu';
import Imazh from './Imazh/Imazh';
import './Head.sass';

function Head({collections}){
    return(
        <header className="Head">
            <Qilim />
            <Subhead />
            <Menu collections={collections} />
            <Imazh />
        </header>
    )
}

export default Head;