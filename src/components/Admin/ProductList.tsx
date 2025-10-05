import React from 'react'
import { useProducts } from '../../firebase/useProducts';
import { Row, Col, Container } from 'react-bootstrap';
import DeleteProduct from './DeleteProduct';
import AddProduct from './AddProduct';


const ProductList: React.FC = () => {
    const { products, loading, error } = useProducts();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {error}</div>;
    if (!products || products.length === 0) return <div>No products in inventory</div>;


    return (
        <Container>
            {products.map((product) => (
                <Row className='m-5' key={product.id}>
                    <Col md={3} lg={3} sm={6} className='d-flex justify-content-center'>
                        <img style={{ width: '6rem', minHeight: 150, maxHeight: 150, objectFit: 'contain' }}
                            src={new URL(`../../assets/images/${product.image}`, import.meta.url).href}
                            alt={`image of ${product.title}`} />
                    </Col>
                    <Col className='my-auto' sm={6} md={4} lg={5} >
                        <h5>{product.title}</h5>
                        <p>${product.price.toFixed(2)}</p>
                    </Col>
                    {/* <Col className='m-auto me-1' sm={6} md={1}>
                        <p className='text-info text-center'>Quantity</p>
                        <div className='d-flex flex-nowrap justify-content-center align-items-center'>
                            <Button className='m-1' variant='outline-none text-info'
                                onClick={() => dispatch(decreaseQuantity(product))}>-</Button>
                            <span>{product.quantity ?? + 1}</span>
                            <Button className='m-1' variant='outline-none text-info'
                                onClick={() => dispatch(increaseQuantity(product))}>+</Button>
                        </div>
                    </Col> */}
                    <Row>
                        <Col>
                        {/* <UpdateProduct /> */}
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <DeleteProduct product={product} />
                        </Col>
                    </Row>
                </Row>
            ))}
            <AddProduct />

            {/* <Row>
                <Col className='d-flex justify-content-end' lg={10}>
                    <div className='d-flex flex-column align-items-end me-5 mb-5'>
                        <p className='mb-2'>Total Items: {totalItems}</p>
                        <p className='mb-0'>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col sm={7} md={8} lg={6} xl={6}>
                    <div className='d-flex justify-content-center mt-2 me-5'>
                        <Button className='d-none d-sm-block' variant='outline-none text-danger' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={4} lg={6} xl={6}>
                    <div className='d-flex justify-content-center'>
                        <CheckoutButton onSuccess={() => setCheckoutComplete(true)} />
                    </div>
                </Col>
            </Row> */}
        </Container>
    );
};

export default ProductList;
