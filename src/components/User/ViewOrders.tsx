import React from 'react';
import { useAuth } from '../../firebase/useAuth';
import { useProducts } from '../../firebase/useProducts';
import { useOrders } from '../../firebase/useOrders';
import { Container, Row, Col } from 'react-bootstrap';

const ViewOrders: React.FC = () => {
    const { currentUser } = useAuth();
    const { products } = useProducts();
    const { orders, loading, error } = useOrders();

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error loading orders: {error}</div>;
    if (!currentUser) return <div>Please log in to view orders</div>;
    if (!orders || orders.length === 0) return <div>No orders found</div>;


    return (
        <>
            <Container>
                {orders.map((order) => (
                    <div key={order.id}>
                        <Row className='mt-5 text-danger justify-content-center justify-content-sm-end'>
                            <Col xs={8} sm={6} md={6} lg={6}>
                                <h6>Order # {order.id}</h6>
                                <p className=''
                                style={{ fontSize: '.85rem' }}>
                                    {order.createdAt.toDate().toLocaleDateString()}</p>
                            </Col>
                        </Row>
                        {order.products.map((orderProduct, index) => {
                            const product = products.find(product => product.id === orderProduct.productId);
                            if (!product) return null;
                            return (
                                <Row className='mx-5 my-sm-none my-3 d-flex align-items-center' key={`${order.id}-${index}`}>
                                    <Col xs={12} sm={2} md={2} lg={1} className='d-flex justify-content-center'>
                                        <img style={{ width: '100%', minHeight: 75, maxHeight: 75, objectFit: 'contain' }}
                                            src={new URL(`../../assets/images/${product.image}`, import.meta.url).href}
                                            alt={`image of ${product.title}`} />
                                    </Col>
                                    <Col xs={12}sm={4} md={4} lg={5}>
                                        <p style={{ fontSize: '.85rem' }}>{orderProduct.title}</p>
                                    </Col>
                                    <Col xs={6} sm={3} md={3} lg={1}>
                                        <p style={{ fontSize: '.85rem' }}>${orderProduct.price.toFixed(2)}</p>
                                    </Col>
                                    <Col xs={6} sm={3} md={3} lg={2}>
                                        <p style={{ fontSize: '.85rem' }}>Quantity: {orderProduct.quantity}</p>
                                    </Col>
                                </Row>
                            );
                        })}
                        <Row className='justify-content-center justify-content-sm-end text-info'>
                            <Col className='d-flex gap-sm-5 gap-3 mt-1 mb-5' xs={8} sm={6} md={6} lg={6}>
                                <h6>Total Items: {order.products.reduce((sum, p) => sum + (p.quantity || 0), 0)}</h6>
                                <h6>Total: ${order.totalPrice}</h6>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </>
    );
};

export default ViewOrders;
