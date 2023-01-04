import { useContext } from 'react';
import SideNavbar from '../components/navbars/SideNavbar';
import { ReactNode } from "react";
import ThemeContext from '../context/ThemeProvider';
import NavbarTop from '../components/navbars/NavbarTop';
import NavbarMobile from '../components/navbars/NavbarMobile';

type Props = {
    children: ReactNode
}

const NavbarLayout = ({ children }: Props) => {

    const { theme } = useContext(ThemeContext);
 
    return (
        <div className={`app ${theme}`}>
                <SideNavbar />
                <NavbarTop />
                <div className='content'>
                    {children}
                    <NavbarMobile />
                </div>
        </div>
    )
}

export default NavbarLayout