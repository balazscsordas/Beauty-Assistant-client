import SideNavbar from '../components/navbars/SideNavbar';
import { useState, useEffect } from 'react';
import { ReactNode } from "react";
import { Container, Row, Col } from 'react-bootstrap';

type Props = {
    children: ReactNode
}

const NavbarLayout = ({ children }: Props) => {
 
    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={3} className="side-navbar-col">
                    <SideNavbar />
                </Col>
                <Col>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default NavbarLayout