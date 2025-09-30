import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Button } from 'react-bootstrap';


const Logout: React.FC = () => {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // go back to login
        } catch (err: unknown) {
            console.error("Logout error:", (err instanceof Error ? err.message : err));
        }
    };


    return (
        <Button variant='outline-info' onClick={handleLogout}>Logout</Button>
    );
}

export default Logout;