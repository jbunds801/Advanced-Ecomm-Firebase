import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Logout from '../components/Logout';
import { Row, Col, Container } from 'react-bootstrap';



const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoggedIn(!!currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {!isLoggedIn ? (
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
                    <h4 className='p-4'>Welcome, {user?.email || "User"}!</h4>
                    <p className='px-4'>View past orders</p>
                    <Logout />
                </div>
            )}
        </>
    );
};

export default Profile;