import React from 'react';
import Shipment from '../../../images/icons/truck.svg';
import Secure from '../../../images/icons/Safe.svg';
import Send from '../../../images/icons/dm.svg';
import CreditCard from '../../../images/icons/Card.svg';
import './QuickInfo.sass';

function QuickInfo(){
    return(
        <div className="QuickInfo">
            <div className="info">
                <img src={Shipment} alt="" />
                <div className="words">
                    <div className="upper">Dërgesa falas kudo</div>
                    <div className="lower">Në të gjithë Shqipërinë</div>
                </div>
            </div>
            <div className="info">
                <img src={Secure} alt="" />
                <div className="words">
                    <div className="upper">Blerje të sigurta</div>
                    <div className="lower">14 ditë mundësi kthimi</div>
                </div>
            </div>
            <div className="info">
                <img src={Send} alt="" />
                <div className="words">
                    <div className="upper">Na shkruani çdo pyetje</div>
                    <div className="lower">Ju përgjigjemi 24/7</div>
                </div>
            </div>
            <div className="info">
                <img src={CreditCard} alt="" />
                <div className="words">
                    <div className="upper">Paguani si të doni</div>
                    <div className="lower">E lehtë dhe e sigurt</div>
                </div>
            </div>
        </div>
    )
}

export default QuickInfo;