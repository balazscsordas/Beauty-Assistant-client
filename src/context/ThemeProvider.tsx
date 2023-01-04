import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
    children: ReactNode
}
interface ThemeContextInterface {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState("themeSky");

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', "themeSky");
            setTheme("themeSky")
        }
        else if(localStorage.getItem('theme') === "themeRose") {
            setTheme("themeRose");
        }
        else if(localStorage.getItem('theme') === "themeNeutral") {
            setTheme("themeNeutral");
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;