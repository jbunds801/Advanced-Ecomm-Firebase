import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { clearCart } from '../../redux/cartSlice';
import { useOrders } from '../../firebase/useOrders';
import { useAuth } from '../../firebase/useAuth';

type CheckoutButtonProps = {
    onSuccess?: () => void;
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onSuccess }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const { createOrder } = useOrders();
    const { currentUser } = useAuth();

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        if (!currentUser) {
            alert('Please log in to complete your order');
            return;
        }

        try {
            const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity ?? 1)), 0);
            const orderData = {
                userId: currentUser.uid,
                products: cartItems.map(item => ({
                    productId: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity ?? 1
                })),
                totalPrice
            };
            await createOrder(orderData);
            dispatch(clearCart());
            alert('Order placed successfully!');
            onSuccess?.();
        } catch (err: unknown) {
            alert('Error placing order');
            console.error(err);
        }
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