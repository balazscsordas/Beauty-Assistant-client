import WeekPicker from "./WeekPicker";
import React, { useContext, useEffect, useMemo } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { addAppointmentToCell, getDayDataFromDayIndex, getNamedDay, getNumberedDay, getNumberedMonth, resetAllCells } from "./Utils";
import ClientContext from "../../context/ClientProvider";
import ServiceContext from "../../context/ServiceProvider";
import axios from "axios";
import AppointmentWrapper from "../smallComponents/sectionWrappers/AppointmentWrapper";

const Calendar = () => {

    const { clients, setClients } = useContext(ClientContext);
    const { services, setServices } = useContext(ServiceContext);
    const { 
        currentWeek,
        currentWeekAppointments,
        hideSaturday,
        hideSunday,
        setNewAppointmentData,
        setOpenAddAppointmentDialog,
        setOpenEditAppointmentDialog,
        setEditAppointmentData,
        editAppointmentData,
        setEmptyRowsForServiceLength
    } = useContext(AppointmentContext);
 
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
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30', '19:45',
    ], [])

    /* APPOINTMENT VISUALIZATION */
    useEffect(() => {
        if (currentWeekAppointments) {
            visualizeAppointments();

            return () => {
                resetAllCells();
            }
        }
    }, [currentWeekAppointments]);


    const visualizeAppointments = () => {
        currentWeekAppointments && currentWeekAppointments.map(appointment => {
            const time = appointment.time;
            const appointmLength = appointment.serviceTime;
            const rowIndex = hours.indexOf(time) + 1;
            const colIndex = new Date(appointment.date).getUTCDay();
            addAppointmentToCell(rowIndex, colIndex, appointmLength, appointment);
        })
    }

    useEffect(() => {
        /* FETCHES THE SERVICE AND CLIENT LIST IF THEY HAVEN'T BEEN FETCHED */
        clients.length === 0 && getClientListAPI();
        services.length === 0 && getServiceListAPI();
    }, [])


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
    }, [currentWeekAppointments]);
    

    const handleTdClick = (cell: HTMLTableCellElement) => {
        const dayIndex = cell.cellIndex;
        const rowIndex = cell.closest('tr')!.rowIndex // Check if it is ok with !

        if (cell.classList.contains('empty')) {
            setNewAppointmentData(prevData => {
                return {
                    ...prevData,
                    date: getDayDataFromDayIndex(dayIndex, currentWeek),
                    time: hours[rowIndex - 1],
                }
            })
            setOpenAddAppointmentDialog(true);
            setEmptyRowsForServiceLength(countEmptyRows(rowIndex, dayIndex)); // Checks how many empty rows are after the filled cell (for service filter by available time)
        }
        else if (cell.classList.contains('full')) {
            currentWeekAppointments && currentWeekAppointments.map(appointment => {
                const appointmentRowIndex = hours.indexOf(appointment.time) + 1;
                const appointmentDayIndex = new Date(appointment.date).getUTCDay();

                if (appointmentRowIndex === rowIndex && appointmentDayIndex === dayIndex) {
                    setEditAppointmentData(appointment);
                    setOpenEditAppointmentDialog(true);
                }
            })
        }
    }


    /* API */
    const getClientListAPI = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-client-list";
            const response = await axios.get(url, { withCredentials: true });
            setClients(response.data.foundClients);
        } catch (err) {
            console.log(err);
        }
    }

    const getServiceListAPI = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-list";
            const response = await axios.get(url, { withCredentials: true });
            setServices(response.data.foundServices);
        } catch (err) {
            console.log(err);
        }
    }

    // returns the number of 15 minutes before the next appointment begin
    function countEmptyRows(rowIndex: number, colIndex: number) {
        let numberOfEmptyCells = 0;
        for (let index = 0; index < 10; index++) {
            const cell = document.getElementsByTagName('tr')[rowIndex + index].getElementsByTagName('td')[colIndex - 1];
            if (cell.classList.contains('full')) {
                break;
            } else {
                numberOfEmptyCells++;
            }
        }
        return numberOfEmptyCells;
    }

    return (
        <section id='calendar-section' className="max-w-5xl m-auto">
            <h1 className='page-title'>Időpontok</h1>
            <AppointmentWrapper>
            <WeekPicker />
            <div className='table-block overflow-scroll'>
                <table className="table-fixed text-center w-full">
                    <thead >
                        <tr className='main-row h-16'>
                            <th className='time-header'></th>
                            <th className='text-center text-base'>
                                {getNamedDay(currentWeek.monday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.monday) + getNumberedDay(currentWeek.monday) + '.'}</span>
                            </th>
                            <th className='text-center text-base'>
                                {getNamedDay(currentWeek.tuesday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.tuesday) + getNumberedDay(currentWeek.tuesday) + '.'}</span>
                            </th>
                            <th className='text-center text-base'>
                                {getNamedDay(currentWeek.wednesday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.wednesday) + getNumberedDay(currentWeek.wednesday) + '.'}</span>
                            </th>
                            <th className='text-center text-base'>
                                {getNamedDay(currentWeek.thurstday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.thurstday) + getNumberedDay(currentWeek.thurstday) + '.'}</span>
                            </th>
                            <th className='text-center text-base'>
                                {getNamedDay(currentWeek.friday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.friday) + getNumberedDay(currentWeek.friday) + '.'}</span>
                            </th>
                            <th className='text-center text-base' hidden={hideSaturday}>
                                {getNamedDay(currentWeek.saturday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.saturday) + getNumberedDay(currentWeek.saturday) + '.'}</span>
                            </th>
                            <th className='text-center text-base' hidden={hideSunday}>
                                {getNamedDay(currentWeek.sunday)}
                                <br/>
                                <span className="text-xs font-normal">{getNumberedMonth(currentWeek.sunday) + getNumberedDay(currentWeek.sunday) + '.'}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour, index) => (
                                <tr key={index}>
                                    <th className='font-normal text-xs'>
                                        <div className='relative bottom-4'>{hour}</div>
                                    </th>
                                    <td className='empty'></td>
                                    <td className='empty'></td>
                                    <td className='empty'></td>
                                    <td className='empty'></td>
                                    <td className='empty'></td>
                                    <td className='empty' hidden={hideSaturday}></td>
                                    <td className='empty' hidden={hideSunday}></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </AppointmentWrapper>
        </section>
    )
}

export default Calendar;

