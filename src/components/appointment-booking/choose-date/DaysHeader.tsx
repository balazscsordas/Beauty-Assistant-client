import { WeekdaysInterface } from "../../../interfaces/AppointmentInterfaces";
import DaysHeaderItem from "./DaysHeaderItem";

interface Props {
    currentWeek: WeekdaysInterface
}

const DaysHeader = ({ currentWeek }: Props) => {

    return (
        <section className="min-w-[600px] ml-16 md:ml-20 sticky top-0 flex flex-row h-16 z-10">
            <DaysHeaderItem date={currentWeek.monday}/>
            <DaysHeaderItem date={currentWeek.tuesday}/>
            <DaysHeaderItem date={currentWeek.wednesday}/>
            <DaysHeaderItem date={currentWeek.thurstday}/>
            <DaysHeaderItem date={currentWeek.friday}/>
            <DaysHeaderItem date={currentWeek.saturday}/>
            <DaysHeaderItem date={currentWeek.sunday}/>
        </section>
    )
}

export default DaysHeader;