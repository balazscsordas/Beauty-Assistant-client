import Link from "next/link"

interface Props {
    href: string;
    icon: React.ReactElement;
    label: string;
}

const NavbarItem = ({ href, icon, label }: Props) => {
    return (
        <Link className='flex items-center mx-2 my-2 p-3 hover:bg-slate-100 hover:text-[#4154f1] rounded-xl' href={href}>
            {icon}
            <span className="ml-3 hidden md:block">{label}</span>
        </Link>
    )
}

export default NavbarItem