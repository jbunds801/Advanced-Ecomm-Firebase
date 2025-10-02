import React, { useState, type FormEvent } from 'react'
import { useAuth } from '../../firebase/useAuth'
import { Form, Button, Card } from 'react-bootstrap'
import '../../styles/Forms.css'


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        //console.log('Login attempt with:', email);

        try {
            await login(email, password);
        } catch (err: unknown) {
            alert('Login error: Please fill out fields');
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
                    <Card.Title className='text-center mb-4' >Login</Card.Title>
                    <Form onSubmit={handleLogin}>
                        <Form.Group data-bs-theme="dark">
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
                                autoComplete="new-password"
                            />
                            <div className='d-flex justify-content-center'>
                                <Button className='mb-2 text-nowrap' variant='outline-info' type='submit'>Login</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default Login;