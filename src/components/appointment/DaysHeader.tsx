import { useContext } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { WeekdaysInterface } from "../../interfaces/AppointmentInterfaces";
import DaysHeaderItem from "./DaysHeaderItem";

interface Props {
    currentWeek: WeekdaysInterface
}

const DaysHeader = ({ currentWeek }: Props) => {

    const { hideSaturday, hideSunday } = useContext(AppointmentContext);

    return (
        <section className="w-full sticky top-0 flex flex-row h-16 z-10">
            <div className="time-header w-16 md:w-20">
            </div>
            <DaysHeaderItem date={currentWeek.monday}/>
            <DaysHeaderItem date={currentWeek.tuesday}/>
            <DaysHeaderItem date={currentWeek.wednesday}/>
            <DaysHeaderItem date={currentWeek.thurstday}/>
            <DaysHeaderItem date={currentWeek.friday}/>
            <DaysHeaderItem date={currentWeek.saturday} hide={hideSaturday}/>
            <DaysHeaderItem date={currentWeek.sunday} hide={hideSunday}/>
        </section>
    )
}

export default DaysHeader;