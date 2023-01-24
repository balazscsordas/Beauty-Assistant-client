import HourBlock from "./HourBlock";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";

const OpeningHoursSettings = () => {
    return (
        <SectionWrapper title="Nyitvatartás">
            <HourBlock day="Hétfő"/>
            <HourBlock day="Kedd"/>
            <HourBlock day="Szerda"/>
            <HourBlock day="Csütörtök"/>
            <HourBlock day="Péntek"/>
            <HourBlock day="Szombat"/>
            <HourBlock day="Vasárnap"/>
        </SectionWrapper>
    )
}

export default OpeningHoursSettings;