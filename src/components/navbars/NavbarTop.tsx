import Link from 'next/link';
import AvatarMobile from '../avatars/AvatarMobile';

const NavbarTop = () => {
    return (
      <header className="bg-white border-b-2 sm:hidden ">
        <section className="flex flex-row w-full p-3 justify-between">
          <Link href="/admin" className='brand' >Beauty Assistant</Link>
          <AvatarMobile />
        </section>
      </header>
    )
};

export default NavbarTop;