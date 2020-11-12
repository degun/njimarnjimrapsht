import React from 'react';
import { Modal, TextContainer } from '@shopify/polaris';

function Register(){
    function handleChange(){}
    function activator(){}
    const active = true;
    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Regjistrohuni në dyqanin tonë online!"
            primaryAction={{
                content: 'Add Instagram',
                onAction: handleChange,
            }}
            secondaryActions={[
            {
                content: 'Learn more',
                onAction: handleChange,
            },
            ]}
        >
            <Modal.Section>
            <TextContainer>
                <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
                </p>
            </TextContainer>
            </Modal.Section>
        </Modal>
    )
}

export default Register;