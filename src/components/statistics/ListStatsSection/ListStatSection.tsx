import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import { ListStatInterface } from "../../../interfaces/StatisticsInterface";
import ListStat from "./ListStat";

interface Props {
    todayData: ListStatInterface;
    weekData: ListStatInterface;
    monthData: ListStatInterface;
}

const ListStatSection = ({ todayData, weekData, monthData }: Props) => {

    const { lang } = useContext(LangContext);
    return (
        <section className="flex flex-col xl:flex-row justify-center">
            <ListStat data={todayData} title={ lang === 'hun' ? "Mai nap" : "Today" } />
            <ListStat data={weekData} title={ lang === 'hun' ? "Jelenlegi hét" : "Current week" }/>
            <ListStat data={monthData} title={ lang === 'hun' ? "Jelenlegi hónap" : "Current month" }/>
        </section>
    )
}

export default ListStatSection;