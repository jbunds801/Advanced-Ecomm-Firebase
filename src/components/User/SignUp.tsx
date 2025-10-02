import React, { useState } from 'react';
import { useAuth } from '../../firebase/useAuth';
import { Form, Button, Card } from 'react-bootstrap';
import '../../styles/Forms.css'



const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password || !firstName || !lastName) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await signUp(email, password, firstName, lastName);
        } catch (err: unknown) {
            console.error(err);
        }
    };


    return (
        <>
            <Card className='form-card my-5 mx-auto'
                data-bs-theme="dark"
                style={{
                    maxWidth: '25rem',
                    minWidth: '25rem',
                    maxHeight: '23rem',
                    minHeight: '23rem',
                }}
            >
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Sign Up</Card.Title>
                    <Form onSubmit={handleSignUp}>
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
                            />
                            <Form.Control className='mb-4'
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='new-password'
                            />
                            <div className='d-flex justify-content-center'>
                                <Button className='mb-2' variant='outline-info' type='submit'>Sign Up</Button>
                                {error && <p>{error}</p>}
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
};

export default SignUp;