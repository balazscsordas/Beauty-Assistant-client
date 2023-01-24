import { useContext } from "react";
import ThemeContext from "../../context/ThemeProvider";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";


const AppearanceSettings = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const themeOptions = ["themeSky", "themeRose", "themeNeutral"]

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
        localStorage.setItem('theme', `${e.target.value}`);
    }
 
    return (
        <SectionWrapper title="Megjelenés">
            <div className='flex flex-row mt-3 justify-between'>
                <p>Téma</p>
                <div>
                    <select onChange={handleChange} defaultValue={theme}>
                        {themeOptions.map((themeOption, index) => (
                            <option key={index} value={themeOption}>
                                {themeOption}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default AppearanceSettings;