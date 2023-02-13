import HourBlock from "./HourBlock";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";
import { BasicPrimaryButton } from "../smallComponents/Buttons";
import LangContext from "../../context/LanguageProvider";
import { useContext } from "react";

const OpeningHoursSettings = () => {

    const { lang } = useContext(LangContext);

    const handleClick = () => {
        /* saveNewData(inputData); */
    }

    return (
        <SectionWrapper title={ lang === 'hun' ? 'Általános nyitvatartás' : 'Opening hours' }>
            <HourBlock day={ lang === 'hun' ? 'Hétfő' : 'Monday' }/>
            <HourBlock day={ lang === 'hun' ? 'Kedd' : 'Tuesday' }/>
            <HourBlock day={ lang === 'hun' ? 'Szerda' : 'Wednesday' }/>
            <HourBlock day={ lang === 'hun' ? 'Csütörtök' : 'Thurstday' }/>
            <HourBlock day={ lang === 'hun' ? 'Péntek' : 'Friday' }/>
            <HourBlock day={ lang === 'hun' ? 'Szombat' : 'Saturday' }/>
            <HourBlock day={ lang === 'hun' ? 'Vasárnap' : 'Sunday' }/>
            <div className="mt-6 text-center">
                <BasicPrimaryButton text={ lang === 'hun' ? 'Mentés' : 'Save' } onClick={handleClick}/>
            </div>
        </SectionWrapper>
    )
}

export default OpeningHoursSettings;