import React from 'react';
import { Modal, TextContainer } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setRegistering, setLoggingIn } from '../../../state/actions/appActions';

function Register(){
    const dispatch = useDispatch();
    const { registering } = useSelector(state => state.app);
    function switchToLogin(){
        dispatch(setRegistering(false))
        dispatch(setLoggingIn(true))
    }
    return (
        <Modal
            open={registering}
            onClose={() => dispatch(setRegistering(false))}
            title="Regjistrohuni në dyqanin tonë online!"
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
                    Register.
                </p>
                or <strong onClick={switchToLogin}>Log in</strong>
            </TextContainer>
            </Modal.Section>
        </Modal>
    )
}

export default Register;