import React, { useState } from 'react';
import { useProducts } from '../../firebase/useProducts';
import { Card, Form, Button } from 'react-bootstrap';


const AddProduct: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const { addProduct } = useProducts();

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !price || !description || !category || !image) {
            alert('Please fill out all fields')
            return;
        }

        try {
            await addProduct({
                title,
                price: Number(price),
                description,
                category,
                image,
                ...(rating && { rating: { rate: rating } })
            });
            setTitle('');
            setPrice('');
            setDescription('');
            setCategory('');
            setImage('');
            setRating(0);
        } catch (err: unknown) {
            console.error(err);
        }
    };


    return (
        <>
            <div>
                <Card className='form-card-product my-5 mx-auto'
                    data-bs-theme="dark"
                    style={{
                        maxWidth: '25rem',
                        minWidth: '25rem',
                        maxHeight: '31rem',
                        minHeight: '31rem',
                    }}
                >
                    <Card.Body>
                        <Card.Title className='text-center mb-4'>Add Product</Card.Title>
                        <Form onSubmit={handleAddProduct}>
                            <Form.Group data-bs-theme="dark">
                                <Form.Control className='mb-4'
                                    type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                                <Form.Control className='mb-4'
                                    type='text'
                                    placeholder='Price'
                                    value={price}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d{0,2}$/.test(value)) {
                                            setPrice(value);
                                        }
                                    }}
                                />
                                <Form.Control className='mb-4'
                                    type='text'
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Form.Select className='mb-4'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="pedals">Pedals</option>
                                    <option value="power supplies">Power Supplies</option>
                                    <option value="microphones">Microphones</option>
                                    <option value="pedalboards">Pedalboards</option>
                                    <option value="cables">Cables</option>
                                </Form.Select>
                                <Form.Control className='mb-4'
                                    type='text'
                                    placeholder='Image URL'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <Form.Control className='mb-4'
                                    type='number'
                                    min={0}
                                    max={5}
                                    step='.1'
                                    placeholder='Rating'
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                />
                                <div className='d-flex justify-content-center'>
                                    <Button className='mb-2' variant='outline-info' type='submit'>Add Product</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default AddProduct;