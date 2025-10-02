import React from 'react'
import ProductCard from '../components/Products/ProductCard';
import CategorySelector from '../components/Products/CategorySelector'
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory } from '../query/api';
import '../styles/Products.css'


const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    //uses useQuery to fetch data from the API
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })

    const { data: productsByCategory } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => fetchProductsByCategory(selectedCategory as string),
        enabled: !!selectedCategory
    })

    if (isLoading && !products) return <p>Loading...</p>;

    //renders components with the fetched product and category data
    return (
        <>
            <h1 className='text-center p-4'>Find your new favorites!</h1>
            <CategorySelector onSetSelectedCategory={setSelectedCategory} />
            <ProductCard products={selectedCategory ? productsByCategory : products} />
        </>
    );
};

export default Products;