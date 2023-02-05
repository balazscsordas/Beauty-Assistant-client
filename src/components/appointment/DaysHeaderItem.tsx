import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";
import { getNamedDay, getNumberedDay, getNumberedMonth } from "./Utils";

interface Props {
    date: Date;
    hide?: boolean
}

const DaysHeaderItem = ({ date, hide }: Props) => {

    const { lang } = useContext(LangContext);

    return (
        <div className={`bg-white text-center flex-1 flex flex-col justify-center items-center ${hide && 'hidden'}`}>
            <p className="text-sm font-bold">{getNamedDay(date, lang)}</p>
            <span className="text-xs font-normal">{getNumberedMonth(date) + getNumberedDay(date) + '.'}</span>
        </div>
    )
}

export default DaysHeaderItem;