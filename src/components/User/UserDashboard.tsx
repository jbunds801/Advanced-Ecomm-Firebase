import React, { useState } from 'react';
import { useAuth } from '../../firebase/useAuth';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Logout from '../../components/User/Logout';
import UpdateProfile from '../../components/User/UpdateProfile';
import DeleteProfile from '../../components/User/DeleteProfile';
import ViewOrders from './ViewOrders';



const UserDashboard: React.FC = () => {
    const [showViewOrders, setShowViewOrders] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const { userName, loading } = useAuth();

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <div>
                <h4 className='p-4'>Welcome, {userName || "User"}!</h4>
                <p className='p-4'>What would you like to do?</p>
                <Container>
                    <Row className='justify-content-center text-center'>
                        <Col className="my-4 my-sm-5 flex-wrap" sm={6} md={3}>
                            <Button className='text-nowrap' variant="outline-info" onClick={() => setShowViewOrders(!showViewOrders)}>
                                View Orders
                            </Button>
                        </Col>
                        <Col className="my-4 my-sm-5" sm={6} md={3}>
                            <Button variant="outline-info" onClick={() => setShowUpdate(!showUpdate)}>
                                {showUpdate ? 'Close Form' : 'Update Profile'}
                            </Button>
                            <Col className='d-flex justify-content-center'>
                                {showUpdate && <UpdateProfile />}
                            </Col>
                        </Col>
                        <Col className="my-4 my-sm-5" sm={6} md={3}>
                            <Logout />
                        </Col>
                        <Col className="my-4 my-sm-5" sm={6} md={3}>
                            <DeleteProfile />
                        </Col>
                    </Row>
                    <Row>
                        {showViewOrders && <ViewOrders />}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserDashboard;

// add logic to close view orders or update form if the other one is open