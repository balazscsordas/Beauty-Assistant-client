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
                <div className='content ml-0 px-3 sm:ml-20 sm:py-3 md:ml-56 md:py-5'>
                    {children}
                    <NavbarMobile />
                </div>
        </div>  
    )
}

export default NavbarLayout