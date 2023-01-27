import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarSection from '../avatars/AvatarSection';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';
import NavbarItem from './NavbarItem';

const sideNavbar = () => {
    return (
        <header className="fixed hidden sm:flex flex-col top-0 left-0 bottom-0 w-20 lg:w-60 font-medium bg-white shadow-md">
            <div className='px-6 py-8'>
                <Link className='hidden lg:block' href="/admin">Beauty Assistant</Link>
                <Link className='block lg:hidden text-center' href="/admin">BA</Link>
            </div>
            <NavbarItem href="/admin/clients" label="Vendégek" icon={<PeopleIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/appointments" label="Időpontok" icon={<CalendarMonthIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/services" label="Szolgáltatások" icon={<RedeemIcon className='m-auto lg:m-0'/>} />
            <NavbarItem href="/admin/giftcards" label="Ajándékutalványok" icon={<BusinessCenterIcon className='m-auto lg:m-0'/>} />
            <div className='mt-auto mb-2'>
                <AvatarSection />
            </div>
        </header>
    )
}

export default sideNavbar;