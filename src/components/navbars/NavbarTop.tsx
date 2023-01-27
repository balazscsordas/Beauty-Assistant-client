import Link from 'next/link';
import AvatarMobile from '../avatars/AvatarMobile';

const NavbarTop = () => {
    return (
      <header className="bg-white border-b-2 sm:hidden z-10">
        <section className="flex flex-row w-full p-3 justify-between h-16 items-center">
          <Link href="/admin" className='font-medium' >Beauty Assistant</Link>
          <AvatarMobile />
        </section>
      </header>
    )
};

export default NavbarTop;