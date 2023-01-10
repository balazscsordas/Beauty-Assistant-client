import { AppointmentInterface, WeekdaysInterface } from '../../interfaces/AppointmentInterfaces';

/* FUNCTIONS */
export const resetAllCells = () => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.rowSpan = 1;
        cell.innerHTML = '';
        cell.classList.remove('full');
    })
}

export const addAppointmentToCell = (rowIndex: number, colIndex: number, appointmLength: number, appointment: AppointmentInterface) => {
    const cell = document.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td')[colIndex];
    const rowSpanVal = appointmLength / 15;
    hideUnusedCellsBeforeRowSpan(rowSpanVal, rowIndex, colIndex);
    cell.rowSpan = rowSpanVal
    cell.classList.add('full');
    cell.classList.remove('empty');
    cell.innerHTML += `<div>${appointment.clientName}</div>`;
}

export const hideUnusedCellsBeforeRowSpan = (rowSpanVal: number, rowIndex: number, colIndex: number) => {
    for (let i = 1; i < rowSpanVal; i++) {
        document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[colIndex].classList.add('hidden');
    }
}

export const showAllCells = () => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.classList.remove('hidden');
    });
}

export const prevWeek = (currentWeek: WeekdaysInterface) => {
    const year = currentWeek.monday.getFullYear();
    const month = currentWeek.monday.getMonth();
    const date = currentWeek.monday.getDate();
    const prevWeek: WeekdaysInterface = {
        monday: new Date(year, month, (date - 7)),
        tuesday: new Date(year, month, (date - 6)),
        wednesday: new Date(year, month, (date - 5)),
        thurstday: new Date(year, month, (date - 4)),
        friday: new Date(year, month, (date - 3)),
        saturday: new Date(year, month, (date - 2)),
        sunday: new Date(year, month, (date - 1)),
    }
    return prevWeek;
}

export const nextWeek = (currentWeek: WeekdaysInterface) => {
    const year = currentWeek.monday.getFullYear();
    const month = currentWeek.monday.getMonth();
    const date = currentWeek.monday.getDate();
    const nextWeek: WeekdaysInterface = {
        monday: new Date(year, month, (date + 7)),
        tuesday: new Date(year, month, (date + 8)),
        wednesday: new Date(year, month, (date + 9)),
        thurstday: new Date(year, month, (date + 10)),
        friday: new Date(year, month, (date + 11)),
        saturday: new Date(year, month, (date + 12)),
        sunday: new Date(year, month, (date + 13)),
    }
    return nextWeek;
}

export const getNamedMonth = (date: Date) => {
    const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
    const month = new Date(date).getMonth();
    return months[month];
}

export const getNumberedMonth = (date: Date) => {
    const months = ['01. ', '02. ', '03. ', '04. ', '05. ', '06. ', '07. ', '08. ', '09. ', '10. ', '11. ', '12. '];
    const month = date.getMonth();
    return months[month];
}

export const getNamedDay = (date: Date) => {
    switch (new Date(date).getDay()) {
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
    const day = new Date(date).getDate();
    if (day < 10) {
        return days[day - 1];
    }
    else {
        return day;
    }
}

export const getWeekDates = (): WeekdaysInterface => {
    const today = new Date();
    const currentDayOfMonth = today.getDate();
    let weekdays: WeekdaysInterface;
    switch (today.getDay()) {
        case 0:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 6)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 5)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                friday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                saturday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                sunday: new Date()
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
                monday: new Date(new Date().setDate(currentDayOfMonth - 5)),
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