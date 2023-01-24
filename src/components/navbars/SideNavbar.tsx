import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarSection from '../avatars/AvatarSection';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';
import NavbarItem from './NavbarItem';

const sideNavbar = () => {
    return (
        <header className="fixed hidden sm:flex flex-col top-0 left-0 bottom-0 w-20 md:w-60 font-medium bg-white shadow-md">
            <div className='px-6 py-8'>
                <Link className='hidden md:block' href="/admin">Beauty Assistant</Link>
                <Link className='block md:hidden' href="/admin">BA</Link>
            </div>
            <NavbarItem href="/admin/clients" label="Vendégek" icon={<PeopleIcon/>} />
            <NavbarItem href="/admin/appointments" label="Időpontok" icon={<CalendarMonthIcon/>} />
            <NavbarItem href="/admin/services" label="Szolgáltatások" icon={<RedeemIcon/>} />
            <NavbarItem href="/admin/giftcards" label="Ajándékutalvány" icon={<BusinessCenterIcon/>} />
            <NavbarItem href="/admin/statistics" label="Statisztikák" icon={<BarChartIcon/>} />
            <div className='mt-auto px-6 py-8'>
                <AvatarSection />
            </div>
        </header>
    )
}

export default sideNavbar;