import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarSection from '../avatars/AvatarSection';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';

const sideNavbar = () => {
    return (
        <div id='side-navbar' className="fixed flex flex-col top-0 left-0 bottom-0 w-60">
            <div className='navbar-header'>
                <Link href="/admin">Beauty Assistant</Link>
            </div>
            <div className='navbar-header-small'>
                <Link href="/admin">BA</Link>
            </div>
            <div className='navbar-body'>
                <Link href="/admin/clients"><PeopleIcon /><span>Vendégek</span></Link>
                <Link href="/admin/appointments"><CalendarMonthIcon /><span>Időpontok</span></Link>
                <Link href="/admin/services"><BusinessCenterIcon /><span>Szolgáltatások</span></Link>
                <Link href="/admin/giftcards"><RedeemIcon /><span>Ajándékutalvány</span></Link>
                <Link href="/admin/statistics"><BarChartIcon /><span>Statisztikák</span></Link>
            </div>
            <div className='navbar-footer'>
                <AvatarSection />
            </div>
        </div>
    )
}

export default sideNavbar;