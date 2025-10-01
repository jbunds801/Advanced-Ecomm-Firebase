import React, { useState } from 'react';
import { useAuth } from '../firebase/useAuth';
import { Row, Col, Container, Button } from 'react-bootstrap';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Logout from '../components/Logout';
import UpdateProfile from '../components/UpdateProfile';
import DeleteProfile from '../components/DeleteProfile';



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
                    <Container className="d-flex flex-wrap justify-content-around">
                        <div className="my-5">
                            <Button variant="outline-info">View Orders</Button>
                        </div>
                        <div className="my-5">
                            <Logout />
                        </div>
                        <div className="my-5 text-center">
                            <Button variant="outline-info" onClick={() => setShowUpdate(!showUpdate)}>
                                {showUpdate ? 'Close Update Form' : 'Update Profile'}
                            </Button>
                            {showUpdate && <UpdateProfile />}
                        </div>
                        <div className="my-5">
                            <DeleteProfile />
                        </div>
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