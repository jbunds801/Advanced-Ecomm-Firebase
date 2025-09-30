import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import '../styles/PageLayout.css'


type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

    return (
        <>
            <div>
                <div>
                    <NavBar />
                </div>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default PageLayout;