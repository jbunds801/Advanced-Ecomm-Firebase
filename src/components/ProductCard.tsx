import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../query/api";
import type { Product } from '../types/types'
import { Button, Card, Col, Row, Container } from 'react-bootstrap'
import DetailModal from './DetailModal'
import AddToCartButton from './AddToCartButton';
import AddedToCartAlert from './AddedToCartAlert';
//import '../styles/ProductCard.css'


type ProductCardProps = {
    products?: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showAddedAlert, setShowAddedAlert] = useState(false)


    //useQuery to fetch product data and display 
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        enabled: !products // only fetch when there are no products prop
    })

    const items: Product[] | undefined = products ?? data;

    if (!products && isLoading) return <div>Loading...</div>;
    if (!products && error) return <div>Error loading products: {(error as Error).message}</div>;
    if (!items || items.length === 0) return <div>No products available</div>;

    //maps over products to display each one in a card
    //styling added to keep cards the same size and content contained within.
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
                                            src={product.image}
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
                                            {product.description.length > 50
                                                ? product.description.slice(0, 50) + '...'
                                                : product.description}
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