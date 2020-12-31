import React, { useState } from 'react';
import { TextField } from '@shopify/polaris';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { ADD_CUSTOMER } from '../../graphql/mutations';
import { facebook, instagram } from '../icons';
import './Subscribe.sass';

function Subscribe(){
    const [added, setAdded] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createCustomer, createdCustomer] = useMutation(ADD_CUSTOMER);

    function addCustomer(e){
        e.preventDefault()
        createCustomer({variables: {input: {
            email,
            password
        }}}).then(() => {
            setAdded(true)
        })
    }

    return(
        <div className="Subscribe">
            <div className="container">
                {added ? <h1>Faleminderit që na u bashkuat!</h1> : <h1>Dëshironi të na bashkoheni?</h1>}
                {added ? null : <form>
                    <TextField value={email} onChange={val => setEmail(val)} type="email" placeholder="Email" />
                    <TextField value={password} onChange={val => setPassword(val)} type="password" placeholder="Fjalëkalim" />
                    <Button variant="primary" onClick={addCustomer}>Dërgo</Button>
                </form>}
                <div className="icons">
                    <a href="https://www.facebook.com/NjiMarNjiMrapsht/" target="_blank" rel="noopener noreceiver">
                        Facebook
                    </a>
                    <a href="https://www.instagram.com/nji_mar_nji_mrapsht/" target="_blank" rel="noopener noreceiver">
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;