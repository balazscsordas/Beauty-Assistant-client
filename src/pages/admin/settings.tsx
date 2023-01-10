import { useContext } from "react";
import Settings from "../../components/settings/Settings";
import ThemeContext from "../../context/ThemeProvider";
import NavbarLayout from "../../Layouts/NavbarLayout";

const MainIndexPage = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <NavbarLayout>
                <Settings/>
            </NavbarLayout>
        </>
    )
}

export default MainIndexPage;