import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Container, Row } from "react-bootstrap";
import { fetchProducts } from "../query/api";
import type { Product } from '../types/types'


const ImageCarousel: React.FC = () => {

    //useQuery is used to fetch product data from API
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading images: {(error as Error).message}</div>;
    if (!data || data.length === 0) return <div>No images available</div>;

    return (
        <>
            <Container fluid className="d-flex justify-content-center px-4">
                <Row>
                    <Carousel className="mt-5" fade data-bs-theme="dark" controls={false} indicators={false}>
                        {data.map((product: Product) => (
                            <Carousel.Item key={product.id} interval={2500} className="d-flex justify-content-center">
                                <img
                                    className='d-block mx-auto img-fluid'
                                    src={product.image}
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