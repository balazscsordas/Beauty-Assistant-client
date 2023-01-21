import HourBlock from "./HourBlock";

const OpeningHoursSettings = () => {
    return (
        <section id="opening-hours-section"  className="section-bubble">
            <h3>Nyitvatartás</h3>
            <HourBlock day="Hétfő"/>
            <HourBlock day="Kedd"/>
            <HourBlock day="Szerda"/>
            <HourBlock day="Csütörtök"/>
            <HourBlock day="Péntek"/>
            <HourBlock day="Szombat"/>
            <HourBlock day="Vasárnap"/>
        </section>
    )
}

export default OpeningHoursSettings;