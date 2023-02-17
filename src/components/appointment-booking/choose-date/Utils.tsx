import { WeekdaysInterface } from "../../../interfaces/AppointmentInterfaces";

export const addAppointmentToCell = (rowIndex: number, colIndex: number, appointmLength: number) => {
    const rowSpanVal = appointmLength / 15;
    for (let i = 0; i < rowSpanVal; i++) {
        const cell = document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[colIndex];
        cell.classList.remove('empty');
        cell.classList.add('full');
        cell.innerHTML += `<div class='h-full  flex items-center justify-center text-[0.65rem] leading-[0.82rem] lg:text-sm font-medium'>${" "}</div>`;
    }
}

export const setBookableCells = (lengthOfService: number, hours: string[]) => {
    const cells = document.querySelectorAll('td');
    const numberOfRows = document.querySelectorAll('tr').length;
    cells.forEach(cell => {
        if (cell.classList.contains('empty')) {
            const dayIndex = cell.cellIndex;
            const rowIndex = cell.closest('tr')!.rowIndex;
            const numberOfRowsToCheck = lengthOfService / 15;
            let numberOfEmptyRows = 1;
            for (let i = 1; i < numberOfRowsToCheck; i++) {
                if (rowIndex + i < numberOfRows) { // Csak akkor megy tovább ha van elég sor
                    const currentCell = document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[dayIndex];
                    if (currentCell.classList.contains('empty')) {
                        numberOfEmptyRows++
                    } else break
                }
            }
            if (numberOfRowsToCheck <= numberOfEmptyRows) {
                cell.classList.add('bookable');
                cell.innerHTML += `<div class='rounded-md h-full flex items-center justify-center text-[0.65rem] leading-[0.82rem] lg:text-sm bg-green-300 font-medium'>${hours[rowIndex]}</div>`;
            }
        }
    });
}

// Makes the cells from the past unable to book
export const setCellsFromPastToFull = (week: WeekdaysInterface) => {
    const currentDate = new Date();
    if (week.monday <= currentDate) {
        setWholeColFull(0);
    }
    if (week.tuesday <= currentDate) {
        setWholeColFull(1);
    }
    if (week.wednesday <= currentDate) {
        setWholeColFull(2);
    }
    if (week.thurstday <= currentDate) {
        setWholeColFull(3);
    }
    if (week.friday <= currentDate) {
        setWholeColFull(4);
    }
    if (week.saturday <= currentDate) {
        setWholeColFull(5);
    }
}

const setWholeColFull = (colIndex: number) => {
    const numberOfRows = document.querySelectorAll('tr').length;
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        const cell = document.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td')[colIndex];
        if (cell.classList.contains('empty')) {
            cell.classList.remove('empty');
        }
    }
}