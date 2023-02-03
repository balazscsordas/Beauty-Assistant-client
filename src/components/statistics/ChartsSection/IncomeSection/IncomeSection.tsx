import { IncomePerDayInterface, IncomePerMonthInterface } from "../../../../interfaces/StatisticsInterface";
import IncomeChart from "./IncomeChart";

interface Props {
    incomePerDay: IncomePerDayInterface;
    incomePerMonth: IncomePerMonthInterface;
}

const IncomeSection = ({ incomePerDay, incomePerMonth }: Props) => {

    const weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    const months = ['Jan.', 'Febr.', 'Márc.', 'Ápr.', 'Máj.', 'Jún.', 'Júl.', 'Aug.', 'Szept.', 'Okt.', 'Nov.', 'Dec.'];

    return (
        <section className="flex flex-col xl:flex-row justify-center">
            <IncomeChart 
                text="Bevétel heti bontásban" 
                labels={weekdays}
                incomePerDay={incomePerDay}/>
            <IncomeChart 
                text="Bevétel havi bontásban" 
                labels={months}
                incomePerMonth={incomePerMonth}/>
        </section>
    )
}

export default IncomeSection;