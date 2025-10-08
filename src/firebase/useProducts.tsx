import { createContext, useContext, useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import type { Product } from '../types/types';

interface ProductsContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, updatedData: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        fetchProducts();
    }, []);


    const fetchProducts = async () => {
        const snapshot = await getDocs(collection(db, 'products'));
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productList);
        setLoading(false);
    }

    const addProduct = async (product: Omit<Product, 'id'>) => {
        try {
            await addDoc(collection(db, 'products'), product);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Error adding product:', err);
            throw err;
        }
    };

    const updateProduct = async (id: string, updateData: Partial<Product>) => {
        try {
            const productRef = doc(db, 'products', id);
            await updateDoc(productRef, updateData);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Error updating product', err);
            throw err;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'products', id));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Error deleting product:', err);
            throw err;
        }
    };


    return (
        <ProductsContext.Provider value={{ products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProducts must be used within a ProductsProvider");
    return context;
}
