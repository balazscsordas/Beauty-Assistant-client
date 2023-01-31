import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useContext } from 'react';
import LangContext from '../../context/LanguageProvider';

const NavbarMobile = () => {

    const { lang } = useContext(LangContext)
    
    return (
        <header id='navbar-mobile' className="flex flex-row flex-nowrap w-full sm:hidden fixed bottom-0 left-0 py-3 bg-white border-t-2 z-10 h-16">
            <Link className="flex justify-center items-center flex-col flex-1" href="/admin/clients"><PeopleIcon/><span className="text-[0.5rem]">{ lang === 'hun' ? 'Vendégek' : 'Clients' }</span></Link>
            <Link className="flex justify-center items-center flex-col flex-1" href="/admin/appointments"><CalendarMonthIcon/><span className="text-[0.5rem]">{ lang === 'hun' ? 'Időpontok' : 'Appointments' }</span></Link>
            <Link className="flex justify-center items-center flex-col flex-1" href="/admin/services"><BusinessCenterIcon/><span className="text-[0.5rem]">{ lang === 'hun' ? 'Szolgáltatások' : 'Services' }</span></Link>
            <Link className="flex justify-center items-center flex-col flex-1" href="/admin/giftcards"><RedeemIcon/><span className="text-[0.5rem]">{ lang === 'hun' ? 'Ajándékutalványok' : 'Giftcards' }</span></Link>
        </header>
    )
};

export default NavbarMobile;