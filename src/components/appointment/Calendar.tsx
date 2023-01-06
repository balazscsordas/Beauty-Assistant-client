import WeekPicker from "./WeekPicker";
import React, { useContext, useEffect } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { checkIfItsOnThisWeek, getDayDataFromDayIndex, getNamedDay, getNumberedDay, getNumberedMonth } from "./Utils";
import AddAppointmentDialog from "./AddAppointmDialog";
import ClientContext from "../../context/ClientProvider";
import ServiceContext from "../../context/ServiceProvider";
import axios from "axios";
import { AppointmentInterface } from "../../interfaces/AppointmentInterfaces";

interface Props {
    foundAppointments: AppointmentInterface[]
}

const Calendar = ({ foundAppointments }: Props) => {

    const { clients, setClients } = useContext(ClientContext);
    const { services, setServices } = useContext(ServiceContext);
    const { currentWeek, setNewAppointmentData, setOpenAddAppointmentDialog } = useContext(AppointmentContext);
    const hours = [
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
    ];

    /* FETCHES THE SERVICE AND CLIENT LIST IF THEY HAVEN'T BEEN FETCHED */
    useEffect(() => {
        clients.length === 0 && getClientListAPI();
        services.length === 0 && getServiceListAPI();
    }, [])

    /* TD ONCLICK EFFECT */
    useEffect(() => {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const dayIndex = cell.cellIndex;
                const rowIndex = cell.closest('tr').rowIndex
                setNewAppointmentData(prevData => {
                    return {
                        ...prevData,
                        date: getDayDataFromDayIndex(dayIndex, currentWeek),
                        time: hours[rowIndex - 1],
                    }
                })
                setOpenAddAppointmentDialog(true);
            });
        })
    }, [currentWeek])


    /* APPOINTMENT VISUALIZATION */
    useEffect(() => {
        resetAllCells();
        foundAppointments.map(appointment => {
            if (checkIfItsOnThisWeek(appointment.date, currentWeek) === true) {
                const time = appointment.time;
                const appointmLength = appointment.serviceTime;
                const rowIndex = hours.indexOf(time) + 1;
                const colIndex = new Date(appointment.date).getDay() - 1;
                addAppointmentToCell(rowIndex, colIndex, appointmLength, appointment);
            } else {
                showAllCells();
            }
        })
    }, [currentWeek]);

    /* FUNCTIONS */
    const resetAllCells = () => {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.rowSpan = 1;
            cell.innerHTML = '';
            cell.classList.remove('appointmentCell');
        })
    }

    const addAppointmentToCell = (rowIndex: number, colIndex: number, appointmLength: number, appointment: AppointmentInterface) => {
        const cell = document.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td')[colIndex];
        const rowSpanVal = appointmLength / 15;
        hideUnusedCellsBeforeRowSpan(rowSpanVal, rowIndex, colIndex);
        cell.rowSpan = rowSpanVal
        cell.classList.add('appointmentCell');
        cell.innerHTML += `<div>${appointment.clientName}</div>`;
    }

    const hideUnusedCellsBeforeRowSpan = (rowSpanVal: number, rowIndex: number, colIndex: number) => {
        for (let i = 1; i < rowSpanVal; i++) {
            document.getElementsByTagName('tr')[rowIndex + i].getElementsByTagName('td')[colIndex].classList.add('hidden');
        }
    }

    const showAllCells = () => {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.classList.remove('hidden');
        });
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

    return (
        <section id='calendar-section'>
            <AddAppointmentDialog/>
            <h1 className='page-title'>Időpontok</h1>
            <WeekPicker />
            <div className='table-block'>
                <table>
                    <thead >
                        <tr className='main-row'>
                            <th className='time-header'></th>
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
                    <tbody>
                        {hours.map((hour, index) => (
                                <tr key={index}>
                                    <th className='time-header'><div className='time-box'>{hour}</div></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Calendar;