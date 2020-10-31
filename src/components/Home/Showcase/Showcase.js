import React, { useState } from 'react';
import { arrow_left, arrow_right } from '../../icons';
import Four from './Four';
import './Showcase.sass';

function Showcase({title, collections}){
    const [active, setActive] = useState(0);
    return (
        <section className="Showcase">
            <h2>{title}</h2>
            <div className="categories">
                <ul className="list">
                    {collections.map(({title}, i) => <li key={title} onClick={() => setActive(i)} className={`collection ${active === i ? "selected" : ""}`}>{title}</li>)}
                </ul>
                <div className="arrows">
                    <span onClick={() => setActive(active === 0 ? (collections.length - 1) : (active - 1))}>{arrow_left}</span>
                    <span onClick={() => setActive(active === (collections.length - 1) ? 0 : (active + 1))}>{arrow_right}</span>
                </div>
            </div>
            <Four handle={collections[active]?.handle} />
        </section>
    )
}

export default Showcase;