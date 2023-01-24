import { useContext } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";

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
        <SectionWrapper title="Időpontfoglaló">
            <div className='flex flex-row mt-3 justify-between'>
                <p>Szombat elrejtése</p>
                <div>
                    <input type="checkbox" name="saturday" onClick={changeSaturday} defaultChecked={hideSaturday}/>
                </div>
            </div>
            <div className='flex flex-row mt-3 justify-between'>
                <p>Vasárnap elrejtése</p>
                <div>
                    <input type="checkbox" name="sunday" onClick={changeSunday} defaultChecked={hideSunday}/>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default AppearanceSettings;