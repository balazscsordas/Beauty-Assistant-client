import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
    children: ReactNode
}
interface ThemeContextInterface {
    lang: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
}
const LangContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export const LangProvider = ({ children }: Props) => {
    const [lang, setLang] = useState("hun");

    useEffect(() => {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', "hun");
            setLang("hun")
        }
        else if(localStorage.getItem('lang') === "eng") {
            setLang("eng");
        }
    }, []);

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    )
}

export default LangContext;