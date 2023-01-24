import AppearanceSettings from "./AppearanceSettings";
import AppointmentSettings from "./AppointmentSettings";
import OpeningHoursSettings from "./OpeningHoursSettings";

const Settings = () => {

    return (
        <section>
            <h1 className="page-title">Beállítások</h1>
            <AppearanceSettings />
            <AppointmentSettings />
            <OpeningHoursSettings />
        </section>
    )
}

export default Settings;