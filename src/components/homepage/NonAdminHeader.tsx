import { useContext, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import engFlag from "../../../public/united-kingdom.png";
import hunFlag from "../../../public/hungary.png";
import LangContext from "../../context/LanguageProvider";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";

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
            <section className="flex max-w-7xl mx-auto items-center justify-between ">
                <Link passHref href="/">
                    <h1 className="font-semibold text-sm md:text-lg p-4 md:p-6">Beauty Assistant</h1>
                </Link>
                <nav className="grid justify-center items-center p-4 md:p-6">
                    <Image 
                        className="cursor-pointer"
                        src={lang === 'hun' ? engFlag : hunFlag} 
                        alt="language"
                        loading="eager"
                        width={25}
                        height={25}
                        onClick={handleClick}
                    />
                </nav>
            </section>
        </header>
    )
}

export default NonAdminHeader;