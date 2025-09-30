import React, { useState, type FormEvent } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { Form, Button, Card } from 'react-bootstrap'
import '../styles/Forms.css'


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Successful!');
        } catch (err: unknown) {
            console.error(err);
        }
    };


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
                    <Card.Title className='text-center mb-4' >Login</Card.Title>
                    <Form>
                        <Form.Group onSubmit={handleLogin} data-bs-theme="dark">
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
                            />
                            <div className='d-flex justify-content-center'>
                                <Button className='mb-2' variant='outline-info' type='submit'>Login</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default Login;