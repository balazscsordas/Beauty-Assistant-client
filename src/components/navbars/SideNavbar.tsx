import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarSection from '../avatars/AvatarSection';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';

const sideNavbar = () => {
    return (
        <section id="side-navbar">
            <Navbar bg="dark" variant="dark">
                <Nav>
                    <Link href="/admin" className="navbar-title nav-link">Beauty Assistant</Link>
                    <Link href="/admin/clients" className="nav-link"><PeopleIcon />Vendégek</Link>
                    <Link href="/admin/appointments"className="nav-link"><CalendarMonthIcon />Időpontok</Link>
                    <Link href="/admin/services"className="nav-link"><BusinessCenterIcon />Szolgáltatások</Link>
                    <Link href="/admin/giftcard"className="nav-link"><RedeemIcon />Ajándékutalvány</Link>
                    <Link href="/admin/statistics"className="nav-link"><BarChartIcon />Statisztikák</Link>
                    <AvatarSection />
                </Nav>
            </Navbar>
        </section>
    )
}

export default sideNavbar;