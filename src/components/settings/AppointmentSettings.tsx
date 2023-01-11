import { useContext } from "react";
import AppointmentContext from "../../context/AppointmentProvider";

const AppearanceSettings = () => {

    const { hideSaturday, hideSunday, setHideSaturday, setHideSunday } = useContext(AppointmentContext);

    const changeSaturday = () => {
        localStorage.setItem('hideSaturday', `${!hideSaturday}`);
        setHideSaturday(!hideSaturday);
    }

    const changeSunday = () => {
        localStorage.setItem('hideSunday', `${!hideSunday}`);
        setHideSunday(!hideSunday);
    }

    return (
        <section id="appearance-settings-section">
            <h3>Időpontfoglaló</h3>
            
            <div className='setting-block'>
                <p className='setting-name'>Szombat elrejtése</p>
                <div>
                    <input type="checkbox" name="saturday" onClick={changeSaturday} defaultChecked={hideSaturday}/>
                </div>
            </div>
            <div className='setting-block'>
                <p className='setting-name'>Vasárnap elrejtése</p>
                <div>
                    <input type="checkbox" name="sunday" onClick={changeSunday} defaultChecked={hideSunday}/>
                </div>
            </div>
            
        </section>
    )
}

export default AppearanceSettings;