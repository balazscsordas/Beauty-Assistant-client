import WeekPicker from "./WeekPicker";
import React, { useContext, useEffect, useState } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { getDayDataFromDayIndex, getNamedDay, getNumberedDay, getNumberedMonth, minuteIndexToMinute } from "./Utils";
import AddAppointmentDialog from "./AddAppointmDialog";

const Calendar = () => {

    const {
        currentWeek,
        newAppointmentData,
        setCurrentWeek,
        setNewAppointmentData,
        setOpenAddAppointmentDialog,
    } = useContext(AppointmentContext);

    const hours = [8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19];

    useEffect(() => {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const minuteIndex = Math.floor(cell.closest('tr').rowIndex % 4);
                const dayIndex = cell.cellIndex;
                setNewAppointmentData(prevData => {
                    return {
                        ...prevData,
                        date: getDayDataFromDayIndex(dayIndex, currentWeek),
                        hour: hours[Math.floor(cell.closest('tr').rowIndex / 4)],
                        minute: minuteIndexToMinute(minuteIndex)
                    }
                })
                setOpenAddAppointmentDialog(true);
            });
        })
    }, [currentWeek])


    return (
        <section id='calendar-section'>
            <AddAppointmentDialog/>
            <h1 className='page-title'>Időpontok</h1>
            <WeekPicker />
            <div className='table-block'>
                <table>
                    <thead >
                        <tr className='main-row'>
                            <th></th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.monday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.monday) + getNumberedDay(currentWeek.monday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.tuesday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.tuesday) + getNumberedDay(currentWeek.tuesday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.wednesday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.wednesday) + getNumberedDay(currentWeek.wednesday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.thurstday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.thurstday) + getNumberedDay(currentWeek.thurstday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.friday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.friday) + getNumberedDay(currentWeek.friday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.saturday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.saturday) + getNumberedDay(currentWeek.saturday) + '.'}</span>
                            </th>
                            <th className='header-item'>
                                {getNamedDay(currentWeek.sunday)}
                                <br/>
                                <span>{getNumberedMonth(currentWeek.sunday) + getNumberedDay(currentWeek.sunday) + '.'}</span>
                            </th>
                        </tr>
                    </thead>
                    {hours.map((hour, index) => (
                        <tbody key={index}>
                            <tr >
                                <th className='time-header'>{hour + ':00'}</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </section>
    )
}

export default Calendar;