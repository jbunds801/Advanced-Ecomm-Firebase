import React, { useState } from 'react';
import { useAuth } from '../firebase/useAuth';
import { Row, Col, Container, Button } from 'react-bootstrap';
import SignUp from '../components/User/SignUp';
import Login from '../components/User/Login';
import Logout from '../components/User/Logout';
import UpdateProfile from '../components/User/UpdateProfile';
import DeleteProfile from '../components/User/DeleteProfile';



const Profile: React.FC = () => {
    const [showUpdate, setShowUpdate] = useState<boolean>(false)
    const { currentUser, userName, loading } = useAuth();

    if (loading) {
        return <h3>Loading...</h3>
    }

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
                    <p className='p-4'>What would you like to do?</p>
                    <Container>
                        <Row className='justify-content-center text-center'>
                            <Col className="my-5 flex-wrap" sm={6} md={3}>
                                <Button className='text-nowrap' variant="outline-info">View Orders</Button>
                            </Col>
                            <Col className="my-5" sm={6} md={3}>
                                <Button className='text-nowrap' variant="outline-info" onClick={() => setShowUpdate(!showUpdate)}>
                                    {showUpdate ? 'Close Update Form' : 'Update Profile'}
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
            )}
        </>
    );
};

export default Profile;

// maybe have a user profile component too that will display when they are logged in
// instead of having the logic in the profile page
// have a button to view past orders that will show the past orders component when clicked

// Any component can ask "who's logged in?"
//const { currentUser, login } = useAuth();