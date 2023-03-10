import { useContext } from "react";
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarSection from '../avatars/AvatarSection';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';
import NavbarItem from './NavbarItem';
import LangContext from '../../context/LanguageProvider';
import BarChartIcon from '@mui/icons-material/BarChart';

const SideNavbar = () => {

    const { lang } = useContext(LangContext)

    return (
        <header className="fixed hidden sm:flex flex-col top-0 left-0 bottom-0 w-20 lg:w-60 font-medium bg-white shadow-md">
            <div className='px-6 py-8'>
                <Link className='hidden lg:block' href="/admin">Beauty Assistant</Link>
                <Link className='block lg:hidden text-center' href="/admin">BA</Link>
            </div>
            <NavbarItem href="/admin/clients" label={ lang === 'hun' ? 'Vendégek' : 'Clients' } icon={<PeopleIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/appointments" label={ lang === 'hun' ? 'Időpontok' : 'Appointments' } icon={<CalendarMonthIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/services" label={ lang === 'hun' ? 'Szolgáltatások' : 'Services' } icon={<BusinessCenterIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/giftcards" label={ lang === 'hun' ? 'Ajándékutalványok' : 'Giftcards' } icon={<RedeemIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/statistics" label={ lang === 'hun' ? 'Statisztikák' : 'Statistics' } icon={<BarChartIcon className='m-auto lg:m-0'/>} />
            <div className='mt-auto mb-2'>
                <AvatarSection />
            </div>
        </header>
    )
}

export default SideNavbar