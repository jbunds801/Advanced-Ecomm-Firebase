import React from 'react';
import { Container } from 'react-bootstrap';
import { useProducts } from '../../firebase/useProducts';

type CategorySelectorProps = {
    onSetSelectedCategory: (category: string | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSetSelectedCategory }) => {
    const { products, error } = useProducts();

    const categories = products ? Array.from(new Set(products.map(product => product.category))) : [];

    if (!categories && error) console.log(error)


    return (
        <>
            <Container>
                <div>
                    {categories && (
                        <div className='mt-3 d-flex flex-wrap justify-content-center'>
                            <span className='all-categories px-3'
                                onClick={() => onSetSelectedCategory('')}>all products</span>
                            {categories.map((category: string) => (
                                <span className='categories px-3'
                                    key={category}
                                    onClick={() => onSetSelectedCategory(category)}
                                >
                                    {category}</span>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default CategorySelector;