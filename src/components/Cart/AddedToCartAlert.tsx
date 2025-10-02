import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap'

interface AddedToCartAlertProps {
    show: boolean;
    onClose: () => void;
}

const AddedToCartAlert: React.FC<AddedToCartAlertProps> = ({ show, onClose }) => {

    useEffect(() => {
        if (!show) return;
        const t = setTimeout(() => onClose(), 1000);
        return () => clearTimeout(t);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <>
            <Alert
                variant='info'
                data-bs-theme="dark"
                onClose={onClose}
                className="position-fixed start-50 translate-middle-x mt-3"
                style={{ zIndex: 9999 }}
            >
                Item Added!
            </Alert>
        </>
    );
};

export default AddedToCartAlert;