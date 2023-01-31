import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";
import AppearanceSettings from "./AppearanceSettings";
import AppointmentSettings from "./AppointmentSettings";
import OpeningHoursSettings from "./OpeningHoursSettings";

const Settings = () => {

    const { lang } = useContext(LangContext);

    return (
        <section>
            <h1 className="page-title">{ lang === 'hun' ? "Beállítások" : 'Settings' }</h1>
            {/* <AppearanceSettings /> */}
            <AppointmentSettings />
            {/* <OpeningHoursSettings /> */}
        </section>
    )
}

export default Settings;