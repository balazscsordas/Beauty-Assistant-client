import { useContext } from "react";
import LangContext from "../../../../context/LanguageProvider";
import { IncomePerDayInterface, IncomePerMonthInterface } from "../../../../interfaces/StatisticsInterface";
import IncomeChart from "./IncomeChart";

interface Props {
    incomePerDay: IncomePerDayInterface;
    incomePerMonth: IncomePerMonthInterface;
}

const IncomeSection = ({ incomePerDay, incomePerMonth }: Props) => {

    const { lang } = useContext(LangContext);
    const weekdays = lang === 'hun' 
        ? ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
        : ['Monday', 'Tuesday', "Wednesday", "Thurstday" , "Friday" , "Saturday", "Sunday"];
    const months = lang === 'hun' 
        ? ['Jan.', 'Febr.', 'Márc.', 'Ápr.', 'Máj.', 'Jún.', 'Júl.', 'Aug.', 'Szept.', 'Okt.', 'Nov.', 'Dec.']
        : ['Jan', 'Febr', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return (
        <section className="flex flex-col xl:flex-row justify-center">
            <IncomeChart 
                text={ lang === 'hun' ? "Bevétel heti bontásban" : "Income by week" } 
                labels={weekdays}
                incomePerDay={incomePerDay}/>
            <IncomeChart 
                text={ lang === 'hun' ? "Bevétel havi bontásban" : "Income by month" } 
                labels={months}
                incomePerMonth={incomePerMonth}/>
        </section>
    )
}

export default IncomeSection;