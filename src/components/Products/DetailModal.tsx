import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import type { Product } from '../../types/types'
import ReactStars from 'react-rating-stars-component';
import AddToCartButton from '../Cart/AddToCartButton';


type DetailModalProps = {
    product?: Product | null
    show: boolean
    onHide: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ product, show, onHide }) => {
    
    if (!product) return null


    return (
        <>
            <Modal data-bs-theme="dark" className='p-3'
                show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto d-flex flex-column align-items-center p-4">
                        <img className='img-fluid mx-auto p-4' 
                            style={{ width: '100%', minHeight: 150, maxHeight: 500, objectFit: 'contain' }}
                            src={`/src/assets/images/${product.image}`}
                            alt={product.title}
                        />
                        <p className='pt-1 fs-5'>Price: ${product.price.toFixed(2)}</p>
                        <div className='pb-4'>
                            <ReactStars
                                count={5}
                                value={product.rating?.rate ?? 0}
                                size={30}
                                isHalf={true}
                                activeColor="#e314ea"
                                color="gray"
                                char="★"
                            />
                        </div>
                        <p className='fs-5'>{product.description}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex mx-auto gap-3 my-2'>
                        <Button variant="outline-info" onClick={onHide}>
                            Close
                        </Button>
                        <AddToCartButton product={product} onAdd={onHide} />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetailModal;

