import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";
import { SalonDataInterface } from "../../interfaces/SalonDataInterface";
import AppearanceSettings from "./AppearanceSettings";
import AppointmentSettings from "./AppointmentSettings";
import BusinessDetailsSettings from "./BusinessDetailsSettings";
import OpeningHoursSettings from "./OpeningHoursSettings";

interface Props {
    salonData: SalonDataInterface;
}

const Settings = ({ salonData }: Props) => {

    const { lang } = useContext(LangContext);

    return (
        <section>
            <h1 className="page-title">{ lang === 'hun' ? "Beállítások" : 'Settings' }</h1>
            {/* <AppearanceSettings /> */}
            <AppointmentSettings />
            <BusinessDetailsSettings salonData={salonData}/>
            {/* <OpeningHoursSettings /> */}
        </section>
    )
}

export default Settings;