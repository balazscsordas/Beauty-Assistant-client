import Link from 'next/link';
import AvatarMobile from '../avatars/AvatarMobile';

const NavbarTop = () => {
    return (
      <div id="navbar-top">
        <Link href="/admin" className='brand' >Beauty Assistant</Link>
        <AvatarMobile />
      </div>
    )
};

export default NavbarTop;