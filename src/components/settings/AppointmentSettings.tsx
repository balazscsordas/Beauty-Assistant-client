import { useContext } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import LangContext from "../../context/LanguageProvider";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";

const AppearanceSettings = () => {

    const { hideSaturday, hideSunday, setHideSaturday, setHideSunday } = useContext(AppointmentContext);
    const { lang } = useContext(LangContext);

    const changeSaturday = () => {
        localStorage.setItem('hideSaturday', `${!hideSaturday}`);
        setHideSaturday(!hideSaturday);
    }

    const changeSunday = () => {
        localStorage.setItem('hideSunday', `${!hideSunday}`);
        setHideSunday(!hideSunday);
    }

    return (
        <SectionWrapper title={ lang === 'hun' ? "Időpontfoglaló" : 'Appointments' }>
            <div className='flex flex-row mt-3 justify-between'>
                <p>{ lang === 'hun' ? "Szombat elrejtése" : 'Hide saturday' }</p>
                <div>
                    <input type="checkbox" name="saturday" onClick={changeSaturday} defaultChecked={hideSaturday}/>
                </div>
            </div>
            <div className='flex flex-row mt-3 justify-between'>
                <p>{ lang === 'hun' ? "Vasárnap elrejtése" : 'Hide sunday' }</p>
                <div>
                    <input type="checkbox" name="sunday" onClick={changeSunday} defaultChecked={hideSunday}/>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default AppearanceSettings;