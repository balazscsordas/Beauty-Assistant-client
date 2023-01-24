import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RedeemIcon from '@mui/icons-material/Redeem';

const NavbarMobile = () => {
    return (
        <header id='navbar-mobile' className="flex flex-row flex-nowrap w-full sm:hidden fixed bottom-0 left-0 py-3 bg-white border-t-2">
            <Link className="flex justify-center items-center flex-col flex-grow" href="/admin/clients"><PeopleIcon/><span className="text-[0.5rem]">Vendégek</span></Link>
            <Link className="flex justify-center items-center flex-col flex-grow" href="/admin/appointments"><CalendarMonthIcon/><span className="text-[0.5rem]">Időpontok</span></Link>
            <Link className="flex justify-center items-center flex-col flex-grow" href="/admin/services"><BusinessCenterIcon/><span className="text-[0.5rem]">Szolgáltatások</span></Link>
            <Link className="flex justify-center items-center flex-col flex-grow" href="/admin/giftcards"><RedeemIcon/><span className="text-[0.5rem]">Ajándékkártyák</span></Link>
            <Link className="flex justify-center items-center flex-col flex-grow" href="/admin/statistics"><BarChartIcon/><span className="text-[0.5rem]">Statisztikák</span></Link>
        </header>
    )
};

export default NavbarMobile;