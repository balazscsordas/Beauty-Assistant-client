import { useContext, useState } from "react";
import ThemeContext from "../../context/ThemeProvider";
import NavbarLayout from "../../Layouts/NavbarLayout";

const MainIndexPage = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <NavbarLayout>
                <button onClick={() => {localStorage.setItem('theme', 'themeSky'); setTheme('themeSky')}}>Sky</button>
                <button onClick={() => {localStorage.setItem('theme', 'themeRose'); setTheme('themeRose')}}>Rose</button>
                <button onClick={() => {localStorage.setItem('theme', 'themeNeutral'); setTheme('themeNeutral')}}>Neutral</button>
            </NavbarLayout>
        </>
    )
}

export default MainIndexPage;