import React from 'react';
import { TextField } from '@shopify/polaris';
import Button from './Button';
import { facebook, twitter, youtube, wifi } from '../icons';
import './Subscribe.sass';

function Subscribe(){
    return(
        <div className="Subscribe">
            <div className="container">
                <h1>Je artizan dhe dëshiron të na bashkohesh?</h1>
                <form>
                    <TextField placeholder="Vendos emailin tënd ketu" />
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