import React, { useState } from 'react';
import { useProducts } from '../../firebase/useProducts';
import type { Product } from '../../types/types';
import { Button } from 'react-bootstrap';

type DeleteProductProps = {
    product: Product;
};

const DeleteProduct: React.FC<DeleteProductProps> = ({ product }) => {
    const [confirmDeleteProduct, setConfirmDeleteProduct] = useState<boolean>(false);
    const { fetchProducts, deleteProduct } = useProducts();

    const handleDeleteProduct = async () => {
        if (!confirmDeleteProduct) {
            setConfirmDeleteProduct(true);
            setTimeout(() => setConfirmDeleteProduct(false), 3000);
            return;
        }

        try {
            await deleteProduct(product.id);
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            alert('Error deleting product:' + error);
        }
    }


    return (
        <>
            <Button variant={confirmDeleteProduct ? 'outline-none text-danger' : 'outline-info'}
                onClick={handleDeleteProduct}>{confirmDeleteProduct ? "Confirm Delete? This action cannot be undone!"
                    : "Delete Product"}</Button>
        </>
    );
};

export default DeleteProduct;