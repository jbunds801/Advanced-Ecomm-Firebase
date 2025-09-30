import React from 'react';
import { useAuth } from '../firebase/useAuth';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Logout from '../components/Logout';
import { Row, Col, Container } from 'react-bootstrap';
import UpdateProfile from '../components/UpdateProfile';



const Profile: React.FC = () => {
    const { currentUser, userName } = useAuth();

    return (
        <>
            {!currentUser ? (
                <div>
                    <h1 className='text-center py-4'>Login or Sign Up to create a profile!</h1>
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
                <div>
                    <h1 className='p-4'>Profile</h1>
                    <h4 className='p-4'>Welcome, {userName || "User"}!</h4>
                    <p className='px-4'>View past orders</p>
                    <Logout />
                    <UpdateProfile/>
                </div>
            )}
        </>
    );
};

export default Profile;

// maybe have a user profile component too that will display when they are logged in
// instead of having the logic in the profile page
// pass update profile component to profile page
// have a button to update profile that will show the update profile component when clicked
// have a button to view past orders that will show the past orders component when clicked