import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'; // Adjust the path if your store file is elsewhere
import { useEffect, useState } from 'react';
import { useAuth } from '../firebase/useAuth';


const NavBar: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [isPulsing, setIsPulsing] = useState<boolean>(false);
    const { currentUser, role } = useAuth();

    const itemCount = cartItems.reduce(
        (total, product) => total + (product.quantity ?? 1),
        0
    );

    //effect to show cart count in real time next to Cart nav link below with
    //styling in separate CSS file
    useEffect(() => {
        if (cartItems.length > 0) {
            setIsPulsing(true);
        }
    }, [cartItems]);

    return (
        <>
            <div>
                <Navbar fixed='top' expand="sm" data-bs-theme="dark" className="nav-bar p-3 mb-4">
                    <div className="container-fluid mx-3">
                        <Navbar.Brand className='nav-brand pb-3' href="/">Ecomm Store</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                            <Nav defaultActiveKey="/home">
                                <Nav.Link className='nav-link' as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link className='nav-link' as={Link} to="/products">
                                    Products
                                </Nav.Link>
                                <Nav.Link className='nav-link' as={Link} to="/about">
                                    About
                                </Nav.Link>
                                {!currentUser ? (
                                    <Nav.Link className='nav-link' as={Link} to="/profile">
                                        Login/Sign Up
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link className='nav-link' as={Link} to="/profile">
                                        Profile
                                    </Nav.Link>
                                )}
                                {currentUser && role === 'admin' ? (
                                    <Nav.Link className='nav-link' as={Link} to="/admin">
                                        Admin
                                    </Nav.Link>
                                ) : undefined
                                }
                                <Nav.Link className='nav-link' as={Link} to="/cart">
                                    Cart
                                    {cartItems.length > 0 && (
                                        <>
                                            <Badge pill bg="none" text='info'
                                                className={isPulsing ? 'pulse' : ''}
                                                onAnimationEnd={() => setIsPulsing(false)}
                                            >{itemCount}</Badge>
                                            <span className="visually-hidden">cart count</span>
                                        </>
                                    )}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        </>
    );
};

export default NavBar;

