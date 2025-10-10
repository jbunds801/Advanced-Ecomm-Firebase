import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCarousel from '../components/Products/ImageCarousel';
import { useProducts } from '../firebase/useProducts';

jest.mock('../firebase/useProducts', () => ({
    useProducts: jest.fn(),
}));

describe('ImageCarousel Component', () => {

    test('renders product images', () => {
        (useProducts as jest.Mock).mockReturnValueOnce({
            products: [
                {
                    id: '1',
                    title: 'Test Product 1',
                    image: 'test1.png',
                    price: 10,
                    description: 'Test description',
                    category: 'test'
                },
                {
                    id: '2',
                    title: 'Test Product 2',
                    image: 'test2.png',
                    price: 20,
                    description: 'Test description 2',
                    category: 'test'
                }
            ],
            loading: false,
            error: null,
            fetchProducts: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
        });

        render(<ImageCarousel />);
        expect(screen.getByAltText('slide image of Test Product 1')).toBeInTheDocument();
        expect(screen.getByAltText('slide image of Test Product 2')).toBeInTheDocument();
    });

    test('shows loading message', () => {
        (useProducts as jest.Mock).mockReturnValueOnce({
            products: [],
            loading: true,
            error: null,
            fetchProducts: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
        });

        render(<ImageCarousel />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('shows error message', () => {
        (useProducts as jest.Mock).mockReturnValueOnce({
            products: [],
            loading: false,
            error: 'testing error',
            fetchProducts: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
        });

        render(<ImageCarousel />);
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
});
