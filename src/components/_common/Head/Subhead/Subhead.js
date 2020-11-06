import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField, Icon } from '@shopify/polaris';
import { SearchMinor, CustomersMinor, CartMajor } from '@shopify/polaris-icons';
import { logo } from '../../../icons';
import { priced } from '../../../helpers';
import './Subhead.sass';

function Subhead(){
    const { lineItems, totalPrice } = useSelector(state => state.checkout);
    const quantity = lineItems.edges?.length ?? 0;
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
                    <Link to="/shporta" className="cart">
                        <div className="cart-icons">
                            <Icon source={CartMajor} />
                            <div className="quantity">{quantity}</div>
                        </div>
                        <div className="words">
                            <div className="shporta">Shporta</div>
                            <div className="cmimi">{priced(totalPrice)}</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Subhead;