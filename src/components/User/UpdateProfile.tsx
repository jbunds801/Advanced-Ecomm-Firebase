import React, { useEffect, type FormEvent } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';
import { useAuth } from '../../firebase/useAuth';
import { db } from '../../firebase/firebaseConfig';
import '../../styles/Forms.css'


const UpdateProfile: React.FC = () => {
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    const { currentUser, userProfile, fetchUser } = useAuth();

    useEffect(() => {

        if (userProfile) {
            setFirstName(userProfile.firstName || '');
            setLastName(userProfile.lastName || '');
            setEmail(userProfile.email || '');
            setPassword('');
            setConfirmPassword('');
        }
    }, [userProfile]);


    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        if (!currentUser) return;

        if (password && password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {

            if (email && email !== currentUser.email) {
                await updateEmail(currentUser, email);
            }

            if (password) {
                await updatePassword(currentUser, password);
            }

            await updateDoc(doc(db, 'users', currentUser.uid), {
                firstName,
                lastName,
                email
            });
            await fetchUser();
            alert('Profile updated successfully!');
        } catch (err: unknown) {
            alert('Error updating profile');
            console.error(err);
        }
    }


    return (
        <>
            <Card className='form-card-profile my-5 mx-auto'
                data-bs-theme="dark"
                style={{
                    maxWidth: '25rem',
                    minWidth: '25rem',
                    maxHeight: '27rem',
                    minHeight: '27rem',
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
                                autoComplete="new-email" //prevents browsers autofill
                            />
                            <Form.Control className='mb-4'
                                type='password'
                                placeholder='Enter New Password'
                                //value={password}
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
                                <Button className='mb-2 text-nowrap' variant='outline-info' type='submit'>Update</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default UpdateProfile;