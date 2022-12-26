import NavbarTop from '../components/navbars/NavbarTop';
import SideNavbar from '../components/navbars/SideNavbar';
import { ReactNode } from "react";
import Container from 'react-bootstrap/Container';

type Props = {
    children: ReactNode
}

const NavbarLayout = ({ children }: Props) => {
    return (
        <>
            <div className='column-layout'>
                <SideNavbar />
                <Container>
                    {children}
                </Container>
                
            </div>
        </>
    )
}

export default NavbarLayout