import Link from "next/link";

const NonAdminHeader = () => {
    return (
        <header className="bg-slate-500">
            <section className="flex p-4 max-w-7xl mx-auto items-center justify-between">
                <Link passHref href="/">
                    <h1 className="font-semibold text-3xl text-black">Beauty Asszisztens</h1>
                </Link>
                <div>
                    <button id="mobile-open-button" className="md:hidden focus:outline-none text-4xl">
                        &#9776;
                    </button>
                </div>
                <nav className="hidden md:block text-lg">
                    <a className="mx-4 hover:opacity-50 cursor-pointer">Foglalás</a>
                    <a className="mx-4 hover:opacity-50 cursor-pointer">Kezelések</a>
                    <a className="mx-4 hover:opacity-50 cursor-pointer">Adatok</a>
                    <a className="mx-4 hover:opacity-50 cursor-pointer">Kapcsolat</a>
                </nav>
            </section>
        </header>
    )
}

export default NonAdminHeader;