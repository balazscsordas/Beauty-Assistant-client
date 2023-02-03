import { ListStatInterface } from "../../../interfaces/StatisticsInterface";
import StatWrapper from "../StatWrapper";
import ListStatItem from "./ListStatItem";

interface Props {
    title: string;
    data: ListStatInterface;
}

const ListStat = ({ title, data }: Props) => {

    return (
        <StatWrapper>
            {title && <h3 className="mb-10 font-semibold">{title}</h3>}
            <ListStatItem
                text="Összes időpont: "
                data={`${data.allAppointments} db`}
            />
            <ListStatItem
                text="Lemondott időpontok: "
                data={`${data.failedAppointments} db`}
            />
            <ListStatItem
                text="Várható bevétel: "
                data={`${data.estimatedIncome} Ft`}
            />
            <ListStatItem
                text="Összes vendég: "
                data={`${data.allClients} db`}
            />
        </StatWrapper>
    )
}

export default ListStat;