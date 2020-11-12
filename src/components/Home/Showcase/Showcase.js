import React, { useState, useRef, useEffect } from 'react';
import { arrow_left, arrow_right } from '../../icons';
import { useSelector } from 'react-redux';
import Four from './Four';
import ByTag from './ByTag';
import FourReversed from './FourReversed';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Draggable from 'react-draggable';
import './Showcase.sass';

function Showcase({title, variant}){
    const menu = useRef(null);
    const item = useRef(null);
    const [active, setActive] = useState(0);
    const {tags, types, smartCategories} = useSelector(state => state.app);
    let categories = [];

    switch(variant){
        case "best-sellers": categories = smartCategories?.map(({title}) => title) ?? []; break;
        case "by-tag": categories = tags; break;
        case "by-type": categories = types; break;
        default: categories = []; break;
    }

    if(menu.current){
        menu.current.setInitial()
    }

    if(!categories || !categories.length)return null;

    return (
        <section className="Showcase">
            <h2>{title}</h2>
            <div className="categories">
                <div className="list">
                    <ScrollMenu
                        data={categories.map((title, i) => <div key={i}>{title}</div>)}
                        selected={`${active}`}
                        onSelect={key => setActive(key)}
                        scrollToSelected={true}
                        ref={menu}
                        itemClass="collection"
                        itemClassActive="selected"
                    />
                </div>
                <div className="arrows">
                    <span onClick={() => setActive(active === 0 ? (categories.length - 1) : (active - 1))}>{arrow_left}</span>
                    <span onClick={() => setActive(active === (categories.length - 1) ? 0 : (active + 1))}>{arrow_right}</span>
                </div>
            </div>
            {variant === "best-sellers" ? <Four {...smartCategories[active]}  /> : null}
            {variant === "by-tag" ? <ByTag tag={tags[active]} /> : null}
            {variant === "by-type" ? <FourReversed type={types[active]} /> : null}
        </section>
    )
}

export default Showcase;

