import { AppointmentInterface, WeekdaysInterface } from '../../interfaces/AppointmentInterfaces';

/* FUNCTIONS */
export const resetAllCells = () => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.rowSpan = 1;
        cell.innerHTML = '';
        cell.classList.remove('full');
        cell.classList.add('empty');
        cell.classList.remove('hidden');
    })
}

export const addAppointmentToCell = (rowIndex: number, colIndex: number, appointmLength: number, appointment: AppointmentInterface) => {
    const cell = document.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td')[colIndex];
    const rowSpanVal = appointmLength / 15;
    hideUnusedCellsBeforeRowSpan(rowSpanVal, rowIndex, colIndex);
    cell.rowSpan = rowSpanVal;
    cell.classList.add('full');
    cell.classList.remove('empty');
    if (appointment.status === 'success') {
        cell.innerHTML += `<div class='success rounded-md text-[0.65rem] leading-[0.82rem] lg:text-sm bg-green-300 font-medium my-1 mx-1 lg:mx-2'>${appointment.clientName}</div>`;
    } 
    else if (appointment.status === 'failure') {
        cell.innerHTML += `<div class='failure rounded-md text-[0.65rem] leading-[0.82rem] lg:text-sm bg-red-300 font-medium my-1 mx-1 lg:mx-2'>${appointment.clientName}</div>`;
    } 
    else {
        cell.innerHTML += `<div class='pending rounded-md text-[0.65rem] leading-[0.82rem] lg:text-sm bg-yellow-300 font-medium my-1 mx-1 lg:mx-2'>${appointment.clientName}</div>`;
    }
}

export const hideUnusedCellsBeforeRowSpan = (rowSpanVal: number, rowIndex: number, colIndex: number) => {
    for (let i = 1; i < rowSpanVal; i++) {
        document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[colIndex].classList.add('hidden');
    }
}


export const prevWeek = (currentWeek: WeekdaysInterface) => {
    const year = currentWeek.monday.getFullYear();
    const month = currentWeek.monday.getMonth();
    const date = currentWeek.monday.getDate();
    const hour = 11; // Random, for the timezone differences
    const prevWeek: WeekdaysInterface = {
        monday: new Date(year, month, (date - 7), hour),
        tuesday: new Date(year, month, (date - 6), hour),
        wednesday: new Date(year, month, (date - 5), hour),
        thurstday: new Date(year, month, (date - 4), hour),
        friday: new Date(year, month, (date - 3), hour),
        saturday: new Date(year, month, (date - 2), hour),
        sunday: new Date(year, month, (date - 1), hour),
    }
    return prevWeek;
}

export const nextWeek = (currentWeek: WeekdaysInterface) => {
    const year = currentWeek.monday.getFullYear();
    const month = currentWeek.monday.getMonth();
    const date = currentWeek.monday.getDate();
    const hour = 11; // Random, for the timezone differences
    const nextWeek: WeekdaysInterface = {
        monday: new Date(year, month, (date + 7), hour),
        tuesday: new Date(year, month, (date + 8), hour),
        wednesday: new Date(year, month, (date + 9), hour),
        thurstday: new Date(year, month, (date + 10), hour),
        friday: new Date(year, month, (date + 11), hour),
        saturday: new Date(year, month, (date + 12), hour),
        sunday: new Date(year, month, (date + 13), hour),
    }
    return nextWeek;
}

export const getNamedMonth = (date: Date, lang: string) => {
    const months = ['Janu??r', 'Febru??r', 'M??rcius', '??prilis', 'M??jus', 'J??nius', 'J??lius', 'Augusztus', 'Szeptember', 'Okt??ber', 'November', 'December'];
    const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = new Date(date).getMonth();
    if (lang === 'hun') {
        return months[month];
    } 
    if (lang === 'eng') {
        return monthsEng[month]
    }
}

export const getShortNamedMonth = (date: Date, lang: string) => {
    const months = ['Jan', 'Febr', 'M??rc', '??pr', 'M??j', 'J??n', 'J??l', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'];
    const monthsEng = ['Jan', 'Febr', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = new Date(date).getMonth();
    if (lang === 'hun') {
        return months[month];
    } 
    if (lang === 'eng') {
        return monthsEng[month]
    }
}

export const getNumberedMonth = (date: Date) => {
    const months = ['01. ', '02. ', '03. ', '04. ', '05. ', '06. ', '07. ', '08. ', '09. ', '10. ', '11. ', '12. '];
    const month = date.getMonth();
    return months[month];
}

export const getNamedDay = (date: Date, lang: string) => {
    switch (new Date(date).getDay()) {
        case 0:
            if (lang === 'hun') {
                return 'Vas??rnap';
            } else {
                return 'Sunday'
            }
        case 1:
            if (lang === 'hun') {
                return 'H??tf??';
            } else {
                return 'Monday'
            }
        case 2:
            if (lang === 'hun') {
                return 'Kedd';
            } else {
                return 'Tuesday'
            }
        case 3:
            if (lang === 'hun') {
                return 'Szerda';
            } else {
                return 'Wednesday'
            }
        case 4:
            if (lang === 'hun') {
                return 'Cs??t??rt??k';
            } else {
                return 'Thurstday'
            }
        case 5:
            if (lang === 'hun') {
                return 'P??ntek';
            } else {
                return 'Friday'
            }
        case 6:
            if (lang === 'hun') {
                return 'Szombat';
            } else {
                return 'Saturday'
            }
    
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
        return day.toString();
    }
}

export const getCurrentWeekDates = (todayGetDate: number): WeekdaysInterface => {

    const today = new Date();
    const currentDayOfMonth = today.getDate();
    let weekdays: WeekdaysInterface;
    switch (todayGetDate) {
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
        case 0:
            return currentWeek.monday;
        case 1:
            return currentWeek.tuesday;
        case 2:
            return currentWeek.wednesday;
        case 3:
            return currentWeek.thurstday;
        case 4:
            return currentWeek.friday;
        case 5:
            return currentWeek.saturday;
        case 6:
            return currentWeek.sunday;

        default:
            return currentWeek.monday;
    }
}

export const getCorrectUTCDay = (date: Date) => {
    const utcDay = date.getUTCDay();
    switch (utcDay) {
        case 0:
            return 6;
        case 1:
            return 0;
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        case 6:
            return 5;
    
        default:
            return 20;
    }
}

    // returns the number of 15 minutes before the next appointment begin
export const countEmptyRowsWhenEmptyClicked = (rowIndex: number, colIndex: number) => {
    let numberOfEmptyCells = 0;
    for (let index = 0; index < 10; index++) {
        const cell = document.getElementsByTagName('tr')[rowIndex + index].getElementsByTagName('td')[colIndex];
        if (cell.classList.contains('full')) {
            break;
        } else {
            numberOfEmptyCells++;
        }
    }
    return numberOfEmptyCells;
}

// returns the number of 15 minutes before the next appointment begin
export const countEmptyRowsWhenFullClicked = (rowIndex: number, colIndex: number) => {
    const rowSpanVal = document.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td')[colIndex].rowSpan;
    let numberOfEmptyCells = rowSpanVal;
    for (let index = 0; index < 10; index++) {
        const cell = document.getElementsByTagName('tr')[rowIndex + rowSpanVal + index].getElementsByTagName('td')[colIndex];
        if (cell.classList.contains('full')) {
            break;
        } else {
            numberOfEmptyCells++;
        }
    }
    return numberOfEmptyCells;
}