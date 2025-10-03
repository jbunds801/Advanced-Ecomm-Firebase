import React from 'react'
import ProductCard from '../components/Products/ProductCard';
import CategorySelector from '../components/Products/CategorySelector'
import { useProducts } from '../firebase/useProducts';
import '../styles/Products.css'


const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    const { products, loading, error } = useProducts();
    console.log("Firestore products:", products);

    if (loading && !products) return <p>Loading...</p>;
    if (!products && error) return <div>Error loading products: {error}</div>;

    // Filter products by selected category
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    //renders components with the fetched product and category data
    return (
        <>
            <h1 className='text-center p-4'>Find your new favorites!</h1>
            <CategorySelector onSetSelectedCategory={setSelectedCategory} />
            <ProductCard products={filteredProducts} />
        </>
    );
};

export default Products;