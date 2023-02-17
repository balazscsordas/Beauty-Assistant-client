import React, { useContext, useEffect, useMemo } from "react";
import { getCorrectUTCDay, getDayDataFromDayIndex, resetAllCells } from "../../appointment/Utils";
import { addAppointmentToCell } from "./Utils";
import DaysHeader from "./DaysHeader";
import HoursCol from "./HoursCol";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import Router from "next/router";

const Calendar = () => {

    const { 
        currentWeek,
        currentWeekAppointments,
        bookAppointmentData,
        setBookAppointmentData
    } = useContext(BookAppointmentContext);

    // Redirects to the start of the appointment booking process
    useEffect(() => {
        !bookAppointmentData.adminId && Router.push("/appointment-booking/choose-salon");
    }, [])

    const hours = useMemo(() => [
        '8:00', '8:15', '8:30', '8:45', 
        '9:00', '9:15', '9:30', '9:45',
        '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45',
        '18:00'
    ], [])

    /* APPOINTMENT VISUALIZATION */
    useEffect(() => {
        if (currentWeekAppointments) {
            visualizeAppointments();
            setBookableCells(bookAppointmentData.serviceLength, hours); // Argumentum: hossza a kezelésnek
            return () => {
                resetAllCells();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeekAppointments]);


    const visualizeAppointments = () => {
        currentWeekAppointments && currentWeekAppointments.map(appointment => {
            const time = appointment.time;
            const appointmLength = appointment.serviceTime;
            const rowIndex = hours.indexOf(time);
            const colIndex = getCorrectUTCDay(new Date(appointment.date));
            addAppointmentToCell(rowIndex, colIndex, appointmLength);
        });
        
    }

    const setBookableCells = (lengthOfService: number, hours: string[]) => {
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

    /* TD ONCLICK EFFECT */
    useEffect(() => {
        if (currentWeekAppointments) {
            const cells = document.querySelectorAll('td');
            cells.forEach(cell => {
                cell.addEventListener('click', () => handleTdClick(cell));
            });
            return () => {
                cells.forEach(cell => {
                    cell.removeEventListener('click', () => handleTdClick(cell));
                });
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeekAppointments]);
    

    const handleTdClick = (cell: HTMLTableCellElement) => {
        const dayIndex = cell.cellIndex;
        const rowIndex = cell.closest('tr')!.rowIndex;

        if (cell.classList.contains('bookable')) {
            setBookAppointmentData(prevData => {
                return {
                    ...prevData,
                    date: getDayDataFromDayIndex(dayIndex, currentWeek),
                    time: hours[rowIndex],
                }
            })
            Router.push('/appointment-booking/confirm');
        }
    }

    return (
        <section>
            {/* <WeekPicker /> */}
            <section className="bg-white py-4 px-2 rounded-xl my-4 shadow-md m-auto w-[600px] sm:w-[800px] lg:w-[1100px] overflow-x-scroll max-w-full">
                <DaysHeader currentWeek={currentWeek}/>
                <div className="flex flex-row">
                <HoursCol/>
                <table className="text-center min-w-[600px] w-full table-fixed">
                    <tbody >
                        {hours.map((hour, index) => (
                            <tr key={index} className="[&:nth-child(4n+1)]:text-sm">
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px] bg-red-200'></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </section>
        </section>
    )
}

export default Calendar;

