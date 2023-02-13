import { useContext } from "react"; 
import LangContext from "../../../context/LanguageProvider";
import PhaseDisplayerItem from "./PhaseDisplayerItem";

interface Props {
    bgColor1: string;
    bgColor2: string;
    bgColor3: string;
    bgColor4: string;
}

const PhaseDisplayer = ({ bgColor1, bgColor2, bgColor3, bgColor4 }: Props) => {

    const { lang } = useContext(LangContext);

    return (
        <section className="flex flex-row max-w-full mx-auto w-96 mb-8">
            <PhaseDisplayerItem bgColor={bgColor1} number={1} title={ lang === 'hun' ? "Szalon" : "Salon"}/>
            <PhaseDisplayerItem bgColor={bgColor2} number={2} title={ lang === 'hun' ? "Szolgáltatás" : "Service"}/>
            <PhaseDisplayerItem bgColor={bgColor3} number={3} title={ lang === 'hun' ? "Időpont" : "Date"}/>
            <PhaseDisplayerItem bgColor={bgColor4} number={4} title={ lang === 'hun' ? "Véglegesítés" : "Confirm"}/>
        </section>
    )
}

export default PhaseDisplayer;