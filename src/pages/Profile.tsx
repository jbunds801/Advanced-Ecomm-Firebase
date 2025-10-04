import React from 'react';
import { useAuth } from '../firebase/useAuth';
import UserDashboard from '../components/User/UserDashboard';
import { Row, Col, Container } from 'react-bootstrap';
import Login from '../components/User/Login';
import SignUp from '../components/User/SignUp';

const Profile: React.FC = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            {!currentUser ? (
                <div>
                    <h1 className='text-center p-4'>Login, or Sign Up to create a profile!</h1>
                    <Container className='d-flex justify-content-center'>
                        <Row>
                            <Col className='mx-5'>
                                <Login />
                            </Col>
                            <Col className='mx-5'>
                                <SignUp />
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <>
                    <h1 className='p-4'>Profile</h1>
                    <UserDashboard />
                </>
            )}
        </>
    );
};

export default Profile;

