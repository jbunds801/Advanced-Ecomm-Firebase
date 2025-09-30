import React, { type FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { Card, Form, Button } from 'react-bootstrap';
import '../styles/Forms.css'

const UpdateProfile: React.FC = () => {
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');


    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            //toast or bootstrap alert
            return;
        }

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            //toast or bootstrap alert
            return;
        }

        try {

            if (email && email !== user.email) {
                await updateEmail(user, email);
            }

            if (password) {
                await updatePassword(user, password);
            }

            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                firstName,
                lastName,
                email
            });
            //toast or bootstrap alert('Profile updated successfully!');
        } catch (error: any) {
            //toast or bootstrap alert(`Error updating profile: ${error.message}`);
        }
    }


    return (
        <>
            <Card className='my-5 mx-auto'
                data-bs-theme="dark"
                style={{
                    maxWidth: '25rem',
                    minWidth: '25rem',
                    maxHeight: '23rem',
                    minHeight: '23rem',
                }}
            >
                <Card.Body>
                    <Card.Title className='text-center mb-4' >Update Profile</Card.Title>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group data-bs-theme="dark">
                            <Form.Control className='mb-4'
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control className='mb-4'
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control className='mb-4'
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="new-email"
                            />
                            <Form.Control className='mb-4'
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <Form.Control className='mb-4'
                                type='password'
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <div className='d-flex justify-content-center'>
                                <Button className='mb-2' variant='outline-info' type='submit'>Update</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default UpdateProfile;