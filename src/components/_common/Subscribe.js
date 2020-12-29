import React from 'react';
import { TextField } from '@shopify/polaris';
import Button from './Button';
import { facebook, twitter, youtube, wifi } from '../icons';
import './Subscribe.sass';

function Subscribe(){
    return(
        <div className="Subscribe">
            <div className="container">
                <h1>Dëshiron të na bashkohesh?</h1>
                <form>
                    <TextField type="email" placeholder="Email" />
                    <TextField type="password" placeholder="Fjalëkalim" />
                    <Button variant="primary">Dërgo</Button>
                </form>
                <div className="icons">
                    {facebook}
                    {twitter}
                    {youtube}
                    {wifi}
                </div>
            </div>
        </div>
    )
}

export default Subscribe;