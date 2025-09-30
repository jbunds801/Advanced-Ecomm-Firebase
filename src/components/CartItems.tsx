import React from 'react';
import { useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { decreaseQuantity, increaseQuantity, removeCartItem, clearCart } from '../redux/cartSlice';
import CheckoutButton from './CheckoutButton';

const CartItems: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch<AppDispatch>();
    const [checkoutComplete, setCheckoutComplete] = React.useState(false);

    const totalItems = cartItems.reduce((sum, product) => sum + (product.quantity ?? 1), 0);
    const totalPrice = cartItems.reduce((sum, product) => sum + product.price * (product.quantity ?? 1), 0);

    React.useEffect(() => {
        if (cartItems.length > 0 && checkoutComplete) setCheckoutComplete(false);
    }, [cartItems.length, checkoutComplete]);

    if (cartItems.length === 0) {
        return checkoutComplete ? (
            <div>
                <h4 className='px-4'>Checkout Complete! Thanks for shopping with us!</h4>
            </div>
        ) : (
            <h4 className='px-4'>Cart is empty!</h4>
        );
    }

    //quantity counter using dispatch and reducers below, imports CheckoutButton to simulate checkout
    return (
        <Container>
            {cartItems.map((product, index) => (
                <Row className='m-5' key={index}>
                    <Col md={3} lg={3} sm={6} className='d-flex justify-content-center'>
                        <img style={{ width: '6rem', minHeight: 150, maxHeight: 150, objectFit: 'contain' }} src={product.image}
                            alt={`image of ${product.title}`} />
                    </Col>
                    <Col className='my-auto' sm={6} md={4} lg={5} >
                        <h5>{product.title}</h5>
                        <p>${product.price.toFixed(2)}</p>
                    </Col>
                    <Col className='m-auto me-1' sm={6} md={1}>
                        <p className='text-info text-center'>Quantity</p>
                        <div className='d-flex flex-nowrap justify-content-center align-items-center'>
                            <Button className='m-1' variant='outline-none text-info'
                                onClick={() => dispatch(decreaseQuantity(product))}>-</Button>
                            <span>{product.quantity ?? + 1}</span>
                            <Button className='m-1' variant='outline-none text-info'
                                onClick={() => dispatch(increaseQuantity(product))}>+</Button>
                        </div>
                    </Col>
                    <Col md={2}>
                        <Button className='mt-4 mx-5 d-none d-md-block' variant='outline-info' size='sm'
                            onClick={() => dispatch(removeCartItem(product.id))}>X</Button>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col className='d-flex justify-content-end' lg={10}>
                    <div className='d-flex flex-column align-items-end me-5 mb-5'>
                        <p className='mb-2'>Total Items: {totalItems}</p>
                        <p className='mb-0'>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={7} md={8} lg={6} xl={6}>
                    <div className='d-flex justify-content-center me-5'>
                        <Button className='d-none d-sm-block' variant='outline-none text-info' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={4} lg={6} xl={6}>
                    <div className='d-flex justify-content-center'>
                        <CheckoutButton onSuccess={() => setCheckoutComplete(true)} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CartItems;