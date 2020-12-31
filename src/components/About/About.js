import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import './About.sass';

function About({ t }){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuOpen(true))
    }, []);

    return(
        <section className="About">
            <h1>{t("About.Rreth nesh")}</h1>
            <p>{t("About.teksti")}</p>
        </section>
    )
}

export default withNamespaces()(About);
