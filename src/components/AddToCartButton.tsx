import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addCartItem } from '../redux/cartSlice';
import type { Product } from '../types/types';
import { Button } from 'react-bootstrap';


interface AddToCartButtonProps {
    product: Product;
    onAdd?: () => void;
}

//uses dispatch to set state of cart, showing items that have been added
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, onAdd }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        dispatch(addCartItem(product));
        if (onAdd) onAdd();
    };

    return (
        <Button variant='outline-info'
            onClick={handleAddToCart}>Add To Cart</Button>
    );
};

export default AddToCartButton;