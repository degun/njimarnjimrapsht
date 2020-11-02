import React from 'react';
import { logo_white, phone_white, mail_white, location_white } from '../icons';
import NEST_logo from '../../images/NEST_logo.png';
import './Footer.sass';

function Footer(){
    return(
        <footer className="Footer">
            <div className="container">
                <div className="column">{logo_white}</div>
                <div className="column">
                    <h3>Na kontaktoni</h3>
                    <ul>
                        <li>{phone_white}  +355 69 23 44 555</li>
                        <li>{mail_white} pyetje@1m1w.al</li>
                        <li>{location_white}  Tiranë, Albania</li>
                    </ul>
                </div>
                <div className="column">
                    <h3>Policies and info</h3>
                    <ul>
                        <li>Termat dhe kushtet</li>
                        <li>Politikat për shitësit</li>
                        <li>Politikat për blerësit</li>
                        <li>Dërgesat dhe kthimet</li>
                    </ul>
                </div>
                <div className="column">
                    <h3>Quick links</h3>
                    <ul>
                        <li>Seller login</li>
                        <li>Seller Sign up</li>
                        <li>Seller Handbook</li>
                        <li>Seller Control</li>
                        <li>Seller FAQs</li>
                    </ul>
                </div>
                <div className="column">
                    <h3>My account</h3>
                    <ul>
                        <li>Accessories</li>
                        <li>Balcony Tables</li>
                        <li>Bar units</li>
                    </ul>
                </div>
            </div>
            <div className="qilim-poshte">
                <div className="foot">
                    <div className="left">
                        <span>&#169; Nji Mar Nji Mrapsht {new Date().getFullYear()}</span>
                        <span className="NEST">With the support of <img src={NEST_logo} alt="NEST logo" /></span>
                    </div>
                    <div className="right">

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;