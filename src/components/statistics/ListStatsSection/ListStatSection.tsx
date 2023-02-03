import { ListStatInterface } from "../../../interfaces/StatisticsInterface";
import ListStat from "./ListStat";

interface Props {
    todayData: ListStatInterface;
    weekData: ListStatInterface;
    monthData: ListStatInterface;
}

const ListStatSection = ({ todayData, weekData, monthData }: Props) => {
    return (
        <section className="flex flex-col xl:flex-row justify-center">
            <ListStat data={todayData} title="Mai nap"/>
            <ListStat data={weekData} title="Jelenlegi hét"/>
            <ListStat data={monthData} title="Jelenlegi hónap"/>
        </section>
    )
}

export default ListStatSection;