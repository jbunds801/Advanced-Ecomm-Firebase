import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import type { RootState } from '../redux/store';
import { clearCart } from '../redux/cartSlice';

type CheckoutButtonProps = {
    onSuccess?: () => void;
};

//separate component for check out function for future uses where
//a checkout button might exsist other places.
const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onSuccess }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        dispatch(clearCart());
        onSuccess?.();
    };

    return (
        <>
            <Button variant="outline-info" onClick={handleCheckout}>
                Checkout
            </Button>
        </>
    );
};

export default CheckoutButton;