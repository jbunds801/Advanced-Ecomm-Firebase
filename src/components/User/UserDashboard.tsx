import React, { useState } from 'react';
import { useAuth } from '../../firebase/useAuth';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Logout from '../../components/User/Logout';
import UpdateProfile from '../../components/User/UpdateProfile';
import DeleteProfile from '../../components/User/DeleteProfile';



const UserDashboard: React.FC = () => {
    const [showUpdate, setShowUpdate] = useState<boolean>(false)
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
                        <Col className="my-5 flex-wrap" sm={6} md={3}>
                            <Button className='text-nowrap' variant="outline-info">View Orders</Button>
                        </Col>
                        <Col className="my-5" sm={6} md={3}>
                            <Button variant="outline-info" onClick={() => setShowUpdate(!showUpdate)}>
                                {showUpdate ? 'Close Form' : 'Update Profile'}
                            </Button>
                            <Col className='d-flex justify-content-center'>
                                {showUpdate && <UpdateProfile />}
                            </Col>
                        </Col>
                        <Col className="my-5" sm={6} md={3}>
                            <Logout />
                        </Col>
                        <Col className="my-5" sm={6} md={3}>
                            <DeleteProfile />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserDashboard;

//create logic that assigns the role automatically when users sign up.

// Any component can ask "who's logged in?"
//const { currentUser, login } = useAuth();