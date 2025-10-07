import React, { useState } from 'react';
import { useAuth } from '../../firebase/useAuth';
import ProductList from './ProductList';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AddProduct from './AddProduct';

const AdminDashboard: React.FC = () => {
    //const [showUpdate, setShowUpdate] = useState<boolean>(false)
    const { /* userName, */ loading } = useAuth();
    const [showProductList, setShowProductList] = useState<boolean>(false);
    const [showAddProduct, setShowAddProduct] = useState<boolean>(false);

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <div>
                {/* <h4 className='p-4'>Welcome, {userName || "User"}!</h4> */}
                <h4 className='p-4'>Manage Products</h4>
                <Container>
                    <Row>
                        <Col className='mx-5'>
                            <div className='d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start'>
                                <div className='d-flex justify-content-center'>
                                    <Button className='m-4 m-lg-5 text-nowrap' variant="outline-info" onClick={() => setShowProductList(!showProductList)}>
                                        Product List
                                    </Button>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <Button className='m-4 m-lg-5 text-nowrap' variant="outline-info" onClick={() => setShowAddProduct(!showAddProduct)}>
                                        Add Product
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <div className='mx-auto'>
                            {showAddProduct && <AddProduct />}
                        </div>
                        <div>
                            {showProductList && <ProductList />}
                        </div>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AdminDashboard;