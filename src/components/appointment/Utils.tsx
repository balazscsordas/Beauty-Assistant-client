import { WeekdaysInterface } from '../../interfaces/AppointmentInterfaces';

export const prevWeek = (currentWeek: WeekdaysInterface) => {
    const mondayDate = currentWeek.monday.getDate();
    const prevWeek: WeekdaysInterface = {
        monday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 7)),
        tuesday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 6)),
        wednesday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 5)),
        thurstday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 4)),
        friday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 3)),
        saturday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 2)),
        sunday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() - 1)),
    }
    return prevWeek;
}

export const nextWeek = (currentWeek: WeekdaysInterface) => {
    const mondayDate = currentWeek.monday.getDate();
    const nextWeek: WeekdaysInterface = {
        monday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 7)),
        tuesday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 8)),
        wednesday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 9)),
        thurstday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 10)),
        friday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 11)),
        saturday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 12)),
        sunday: new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), (currentWeek.monday.getDate() + 13)),
    }
    return nextWeek;
}

export const getNamedMonth = (date: Date) => {
    const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
    const month = date.getMonth();
    return months[month];
}

export const getNumberedMonth = (date: Date) => {
    const months = ['01. ', '02. ', '03. ', '04. ', '05. ', '06. ', '07. ', '08. ', '09. ', '10. ', '11. ', '12. '];
    const month = date.getMonth();
    return months[month];
}

export const getNamedDay = (date: Date) => {
    const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    switch (date.getDay()) {
        case 0:
            return 'Vasárnap';
        case 1:
            return 'Hétfő'
        case 2:
            return 'Kedd'
        case 3:
            return 'Szerda'
        case 4:
            return 'Csütörtök'
        case 5:
            return 'Péntek'
        case 6:
            return 'Szombat'
    
        default:
            return 'Error with getNamedDay function'
    }
}


export const getNumberedDay = (date: Date) => {
    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const day = date.getDate();
    if (day < 10) {
        return days[day - 1];
    }
    else {
        return day;
    }
}

/* export const getMondayOfCurrentWeek = (date: Date) => {
    const dateOfMonth = date.getDate();
    switch (getNamedDay(date)) {
        case 'Hétfő':
            return date;
        case 'Kedd':
            date.setDate(dateOfMonth - 1)
                return date
        case 'Szerda':
            date.setDate(dateOfMonth - 2)
            return date
        case 'Csütörtök':
            date.setDate(dateOfMonth - 3)
            return date
        case 'Péntek':
            date.setDate(dateOfMonth - 4)
            return date
        case 'Szombat':
            date.setDate(dateOfMonth - 5)
            return date
        case 'Vasárnap':
            date.setDate(dateOfMonth - 6)
            return date
    
        default:
            return date
    }
}

export const getOtherDayOfCurrentWeek = (mondayDate: Date, day: String) => {
    const dateOfMonth = mondayDate.getDate();
    let addValue = 0;
    switch (day) {
        case 'Tuesday':
            addValue = 1
            break;
        case 'Wednesday':
            addValue = 2
            break;
        case 'Thurstday':
            addValue = 3
            break;
        case 'Friday':
            addValue = 4
            break;
        case 'Saturday':
            addValue = 5
            break;
        case 'Sunday':
            addValue = 6
            break;
    
        default:
            addValue = 0
            break;
    }
    let returnDate = mondayDate;
    returnDate.setDate(dateOfMonth + addValue);
    return returnDate;
}

export const getCurrentWeek = () => {
    const currentDay = new Date();
    const mondayDate = getMondayOfCurrentWeek(currentDay);
    const tuesdayDate = getOtherDayOfCurrentWeek(mondayDate, 'Tuesday');
    const wednesdayDate = getOtherDayOfCurrentWeek(mondayDate, 'Wednesday');
    const thurstdayDate = getOtherDayOfCurrentWeek(mondayDate, 'Thurstday');
    const fridayDate = getOtherDayOfCurrentWeek(mondayDate, 'Friday');
    const saturdayDate = getOtherDayOfCurrentWeek(mondayDate, 'Saturday');
    const sundayDate = getOtherDayOfCurrentWeek(mondayDate, 'Sunday');
    const weekdays = {
        mondayDate,
        tuesdayDate,
        wednesdayDate,
        thurstdayDate,
        fridayDate,
        saturdayDate,
        sundayDate
    }
    return weekdays;
} */


export const getWeekDates = (): WeekdaysInterface => {
    const today = new Date();
    const currentDayOfMonth = today.getDate();
    let weekdays: WeekdaysInterface;
    switch (today.getDay()) {
        case 0:
            weekdays = {
                sunday: new Date(),
                monday: new Date(new Date().setDate(currentDayOfMonth - 6)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 5)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                friday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                saturday: new Date(new Date().setDate(currentDayOfMonth - 1)),
            }
            return weekdays;
        case 1:
            weekdays = {
                monday: new Date(),
                tuesday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 4)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 5)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 6))
            }
            return weekdays;
        case 2:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                tuesday: new Date(),
                wednesday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 4)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 5))
            }
            return weekdays;
        case 3:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                wednesday: new Date(),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 4))
            }
            return weekdays;
        case 4:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                thurstday: new Date(),
                friday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 3))
            }
            return weekdays;
        case 5:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                friday: new Date(),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 2))
            }
            return weekdays;
        case 6:
            weekdays = {
                monday: new Date(),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                friday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                saturday: new Date(),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 1))
            }
            return weekdays;
        default: 
            weekdays = {
                monday: new Date(),
                tuesday: new Date(),
                wednesday: new Date(),
                thurstday: new Date(),
                friday: new Date(),
                saturday: new Date(),
                sunday: new Date(),
            }
            return weekdays;
    }
}

export const getDayDataFromDayIndex = (dayIndex: number, currentWeek: WeekdaysInterface) => {
    switch (dayIndex) {
        case 1:
            return currentWeek.monday;
        case 2:
            return currentWeek.tuesday;
        case 3:
            return currentWeek.wednesday;
        case 4:
            return currentWeek.thurstday;
        case 5:
            return currentWeek.friday;
        case 6:
            return currentWeek.saturday;
        case 7:
            return currentWeek.sunday;

        default:
            return currentWeek.monday;
    }
}


/* export const appointmentLengthToRowSpan = (length: number) => {
    switch (length) {
        case 0:
            return 1;
        case 15:
            return 2;
        case 30:
            return 3;
        case 45:
            return 4;
    
        default:
            return 1;
    }
} */

export const checkIfItsOnThisWeek = (appointmentDate: Date, currentWeek: WeekdaysInterface) => {
    const appointmDateStr = dateToString(appointmentDate);
    const sundayStr = dateToString(currentWeek.sunday);
    const mondayStr = dateToString(currentWeek.monday);
    const tuesdayStr = dateToString(currentWeek.tuesday);
    const wednesdayStr = dateToString(currentWeek.wednesday);
    const thurstdayStr = dateToString(currentWeek.thurstday);
    const fridayStr = dateToString(currentWeek.friday);
    const saturdayStr = dateToString(currentWeek.saturday);

    if (appointmDateStr === sundayStr || 
        appointmDateStr === mondayStr || 
        appointmDateStr === tuesdayStr || 
        appointmDateStr === wednesdayStr || 
        appointmDateStr === thurstdayStr || 
        appointmDateStr === fridayStr || 
        appointmDateStr === saturdayStr) {
        return true
    } else {
        return false
    }
}

const dateToString = (date: Date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    const string =`${year} + ${month} + ${day}`;
    return string;
}