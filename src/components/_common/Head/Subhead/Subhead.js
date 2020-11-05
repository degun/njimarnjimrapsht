import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Icon } from '@shopify/polaris';
import { SearchMinor, CustomersMinor, HeartMajor, CartMajor } from '@shopify/polaris-icons';
import { logo } from '../../../icons';
import './Subhead.sass';

function Subhead(){
    const quantity = 5;
    return(
        <div className="Subhead">
            <Link to="/">{logo}</Link>
            <div className="utilities">
                <div className="item">
                    <div className="language">
                        <span>EN</span>/<strong className="selected">AL</strong>
                    </div>
                </div>
                <div className="item">
                    <TextField placeholder="Kërko këtu" prefix={<Icon source={SearchMinor} />} />
                </div>
                <div className="item">
                    <div className="kontakto">Na kontakto këtu nëse<br /> je artizan shqiptar</div>
                </div>
                <div className="item">
                    <div className="hyr">
                        <button><Icon source={CustomersMinor} /> Hyr</button>
                        <div className="register">apo <strong><a href="/">Regjistrohu tani!</a></strong></div>
                    </div>
                    
                </div>
                <div className="item">
                    <div className="heart-icons">
                        <Icon source={HeartMajor} />
                        <div className="quantity">{quantity}</div>
                    </div>
                </div>
                <div className="item">
                    <div className="cart">
                        <div className="cart-icons">
                            <Icon source={CartMajor} />
                            <div className="quantity">0</div>
                        </div>
                        <div className="words">
                            <div className="shporta">Shporta</div>
                            <div className="cmimi">ALL 0.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subhead;