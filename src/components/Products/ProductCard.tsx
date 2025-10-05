import React, { useState } from 'react';
import type { Product } from '../../types/types'
import { Button, Card, Col, Row, Container } from 'react-bootstrap'
import DetailModal from './DetailModal'
import AddToCartButton from '../Cart/AddToCartButton';
import AddedToCartAlert from '../Cart/AddedToCartAlert';
import { useProducts } from '../../firebase/useProducts';


 
type ProductCardProps = {
    products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showAddedAlert, setShowAddedAlert] = useState<boolean>(false)

    const { products: contextProducts, loading, error } = useProducts();

    const items = products ?? contextProducts;

    if (!products && loading) return <div>Loading...</div>;
    if (!products && error) return <div>Error loading products: {error}</div>;
    if (!items || items.length === 0) return <div>No products available</div>;


    return (
        <>
            <Container>
                <AddedToCartAlert show={showAddedAlert} onClose={() => setShowAddedAlert(false)} />
                <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
                    {items.map((product: Product) => (
                        <Col key={product.id}
                            className='d-flex justify-content-center'>
                            <div>
                                <Card className='m-5 p-4'
                                    data-bs-theme="dark"
                                    style={{
                                        width: '18rem',
                                        height: 520,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div className='d-flex justify-content-center'>
                                        <img style={{ width: '14rem', minHeight: 250, maxHeight: 250, objectFit: 'contain' }}
                                            src={new URL(`../../assets/images/${product.image}`, import.meta.url).href}
                                            alt={`image of ${product.title}`}
                                        />
                                    </div>
                                    <Card.Body className='mt-4'>
                                        <Card.Title>
                                            {product.title.length > 35
                                                ? product.title.slice(0, 35) + '...'
                                                : product.title}
                                        </Card.Title>
                                        <Card.Text style={{ maxHeight: '3rem', overflow: 'hidden' }}>
                                            {product.description && product.description.length > 50
                                                ? product.description.slice(0, 50) + '...'
                                                : product.description || 'No description available'}
                                        </Card.Text>
                                        <div className='d-flex justify-content-between my-4 gap-4 position-absolute bottom-0'>
                                            <Button variant='outline-info' onClick={() => { setSelectedProduct(product); setShowModal(true); }}>Details</Button>
                                            <AddToCartButton product={product} onAdd={() => setShowAddedAlert(true)} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            <DetailModal product={selectedProduct} show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
};

export default ProductCard;