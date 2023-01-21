import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RedeemIcon from '@mui/icons-material/Redeem';

const NavbarMobile = () => {
    return (
        <div id='navbar-mobile'>
            <Link href="/admin/clients"><PeopleIcon/><span>Vendégek</span></Link>
            <Link href="/admin/appointments"><CalendarMonthIcon/><span>Időpontok</span></Link>
            <Link href="/admin/services"><BusinessCenterIcon/><span>Szolgáltatások</span></Link>
            <Link href="/admin/giftcards"><RedeemIcon/><span>Ajándékkártyák</span></Link>
            <Link href="/admin/statistics"><BarChartIcon/><span>Statisztikák</span></Link>
        </div>
    )
};

export default NavbarMobile;