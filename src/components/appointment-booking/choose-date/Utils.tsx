
export const addAppointmentToCell = (rowIndex: number, colIndex: number, appointmLength: number) => {
    const rowSpanVal = appointmLength / 15;
    for (let i = 0; i < rowSpanVal; i++) {
        const cell = document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[colIndex];
        cell.classList.remove('empty');
        cell.classList.add('full');
        cell.innerHTML += `<div class='h-full  flex items-center justify-center text-[0.65rem] leading-[0.82rem] lg:text-sm font-medium'>${" "}</div>`;
    }
}