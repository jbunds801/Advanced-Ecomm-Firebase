import React from "react";
import { Carousel, Container, Row } from "react-bootstrap";
import type { Product } from '../../types/types'
import { useProducts } from "../../firebase/useProducts";


const ImageCarousel: React.FC = () => {
    const { products, loading, error } = useProducts();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading images: {error}</div>;
    if (!products || products.length === 0) return <div>No images available</div>;

    return (
        <>
            <Container fluid className="d-flex justify-content-center px-4">
                <Row>
                    <Carousel className="mt-5" fade data-bs-theme="dark" controls={false} indicators={false}>
                        {products.map((product: Product) => (
                            <Carousel.Item key={product.id} interval={2500} className="d-flex justify-content-center">
                                <img
                                    className='d-block mx-auto img-fluid'
                                    style={{ maxHeight: '600px' }}
                                    src={new URL(`../../assets/images/${product.image}`, import.meta.url).href}
                                    alt={`slide image of ${product.title}`}

                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </>
    );
};

export default ImageCarousel;