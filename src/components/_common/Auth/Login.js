import React from 'react';
import { Modal, TextContainer } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setRegistering, setLoggingIn } from '../../../state/actions/appActions';

function LogIn(){
    const dispatch = useDispatch();
    const { loggingIn } = useSelector(state => state.app);
    function switchToRegister(){
        dispatch(setLoggingIn(false))
        dispatch(setRegistering(true))
    }
    return (
        <Modal
            open={loggingIn}
            onClose={() => dispatch(setLoggingIn(false))}
            title="Hyni në dyqanin tonë online!"
            primaryAction={{
                content: 'Add Instagram',
                onAction: null,
            }}
            secondaryActions={[
            {
                content: 'Learn more',
                onAction: null,
            },
            ]}
        >
            <Modal.Section>
            <TextContainer>
                <p>
                    LogIn.
                </p>
                or <strong onClick={switchToRegister}>Register</strong>
            </TextContainer>
            </Modal.Section>
        </Modal>
    )
}

export default LogIn;