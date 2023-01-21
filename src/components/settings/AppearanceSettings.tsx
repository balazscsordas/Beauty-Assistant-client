import { MenuItem, TextField } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../context/ThemeProvider";


const AppearanceSettings = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const themeOptions = ["themeSky", "themeRose", "themeNeutral"]

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
        localStorage.setItem('theme', `${e.target.value}`);
    }
 
    return (
        <section id="appearance-settings-section" className="section-bubble">
            <h3>Megjelenés</h3>
            <div className='setting-block'>
                <p className='setting-name'>Téma</p>
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
            
        </section>
    )
}

export default AppearanceSettings;