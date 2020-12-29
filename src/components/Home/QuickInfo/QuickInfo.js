import React from 'react';
import { withNamespaces } from 'react-i18next';
import Shipment from '../../../images/icons/truck.svg';
import Secure from '../../../images/icons/Safe.svg';
import Send from '../../../images/icons/dm.svg';
import CreditCard from '../../../images/icons/Card.svg';
import './QuickInfo.sass';

function QuickInfo({ t }){
    return(
        <div className="QuickInfo">
            <div className="info">
                <img src={Shipment} alt="" />
                <div className="words">
                    <div className="upper">{t("QuickInfo.Dërgesa falas kudo")}</div>
                    <div className="lower">{t("QuickInfo.Në të gjithë Shqipërinë")}</div>
                </div>
            </div>
            <div className="info">
                <img src={Secure} alt="" />
                <div className="words">
                    <div className="upper">{t("QuickInfo.Blerje të sigurta")}</div>
                    <div className="lower">{t("QuickInfo.14 ditë mundësi kthimi")}</div>
                </div>
            </div>
            <div className="info">
                <img src={Send} alt="" />
                <div className="words">
                    <div className="upper">{t("QuickInfo.Na shkruani çdo pyetje")}</div>
                    <div className="lower">{t("QuickInfo.Ju përgjigjemi 24/7")}</div>
                </div>
            </div>
            <div className="info">
                <img src={CreditCard} alt="" />
                <div className="words">
                    <div className="upper">{t("QuickInfo.Paguani si të doni")}</div>
                    <div className="lower">{t("QuickInfo.E lehtë dhe e sigurt")}</div>
                </div>
            </div>
        </div>
    )
}

export default withNamespaces()(QuickInfo);