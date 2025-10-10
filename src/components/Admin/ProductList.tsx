import React, { useState } from 'react'
import { useProducts } from '../../firebase/useProducts';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import { Row, Col, Container, Button } from 'react-bootstrap';


const ProductList: React.FC = () => {
    const [showUpdateId, setShowUpdateId] = useState<string | null>(null)

    const { products, loading, error } = useProducts();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {error}</div>;
    if (!products || products.length === 0) return <div>No products in inventory</div>;


    return (
        <>
            <Container className='mt-5 m-lg-none'>
                {products.map((product) => (
                    <div key={product.id}>
                        <Row className='m-2 m-lg-5'>


                            <Col sm={5} md={5} lg={3} className='d-flex justify-content-center'>
                                <img style={{ width: '100%', minHeight: 150, maxHeight: 150, objectFit: 'contain' }}
                                    src={`/src/assets/images/${product.image}`}
                                    alt={`image of ${product.title}`} />
                            </Col>


                            <Col className='my-auto mt-4' sm={6} md={6} lg={5} >
                                <h5>{product.title}</h5>
                                <p>${product.price.toFixed(2)}</p>
                            </Col>


                            <Col className='d-flex flex-row-reverse flex-lg-column align-items-center
                                    justify-content-center m-2 gap-3 gap-lg-5 mb-5 mx-auto' md={6} lg={3}>
                                <div>
                                    <DeleteProduct product={product} />
                                </div>
                                <div>
                                    <Button variant="outline-info" className='btn-md btn-xs-sm'
                                        onClick={() => setShowUpdateId(showUpdateId === product.id ? null : product.id)}>
                                        {showUpdateId === product.id ? 'Close Form' : 'Update Product'}
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        {showUpdateId === product.id && (
                            <Row className='mx-5 mb-4'>
                                <Col className='d-flex justify-content-center'>
                                    <UpdateProduct product={product} />
                                </Col>
                            </Row>
                        )}
                    </div>
                ))}
            </Container>
        </>
    );
};

export default ProductList;


//add logic to change quantity later