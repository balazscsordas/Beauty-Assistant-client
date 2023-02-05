import { useContext, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import engFlag from "../../../public/united-kingdom.png";
import hunFlag from "../../../public/hungary.png";
import LangContext from "../../context/LanguageProvider";

const NonAdminHeader = () => {

    const { lang, setLang } = useContext(LangContext);

    const handleClick = () => {
        if (lang == 'eng') {
            setLang('hun');
            localStorage.setItem('lang', 'hun');
        } else if (lang == 'hun') {
            setLang('eng');
            localStorage.setItem('lang', 'eng');
        }
    }

    return (
        <header className="border-b-[1px] border-indigo-600">
            <section className="flex p-4 max-w-7xl mx-auto items-center justify-between">
                <Link passHref href="/">
                    <h1 className="font-semibold text-sm md:text-lg text-black">Beauty Asszisztens</h1>
                </Link>
                <nav>
                    <Image 
                        className="cursor-pointer"
                        src={lang === 'hun' ? engFlag : hunFlag} 
                        alt="language"
                        width={20}
                        height={20}
                        onClick={handleClick}
                    />
                </nav>
            </section>
        </header>
    )
}

export default NonAdminHeader;