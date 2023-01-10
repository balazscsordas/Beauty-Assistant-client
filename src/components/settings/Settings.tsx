import AppearanceSettings from "./AppearanceSettings";
import AppointmentSettings from "./AppointmentSettings";

const Settings = () => {

    return (
        <section id="settings-section">
            <h1 className="page-title">Beállítások</h1>
            <AppearanceSettings />
            <AppointmentSettings />
        </section>
    )
}

export default Settings;