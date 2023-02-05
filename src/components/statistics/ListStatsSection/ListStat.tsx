import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import { ListStatInterface } from "../../../interfaces/StatisticsInterface";
import StatWrapper from "../StatWrapper";
import ListStatItem from "./ListStatItem";

interface Props {
    title: string;
    data: ListStatInterface;
}

const ListStat = ({ title, data }: Props) => {

    const { lang } = useContext(LangContext);

    return (
        <StatWrapper>
            {title && <h3 className="mb-10 font-semibold">{title}</h3>}
            <ListStatItem
                text={ lang === 'hun' ? "Összes időpont: " : "All appointments: "}
                data={`${data.allAppointments}`}
            />
            <ListStatItem
                text={ lang === 'hun' ? "Lemondott időpontok: " : "Canceled appointments: " }
                data={`${data.failedAppointments}`}
            />
            <ListStatItem
                text={ lang === 'hun' ? "Várható bevétel: " : "Estimated income: " }
                data={ lang === 'hun' ? `${data.estimatedIncome} Ft` : `${data.estimatedIncome} €`}
            />
            <ListStatItem
                text={ lang === 'hun' ? "Összes vendég: " : "Number of clients: " }
                data={`${data.allClients}`}
            />
        </StatWrapper>
    )
}

export default ListStat;