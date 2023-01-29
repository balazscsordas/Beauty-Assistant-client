import WeekPicker from "./WeekPicker";
import React, { useContext, useEffect, useMemo } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { addAppointmentToCell, getDayDataFromDayIndex, getNamedDay, getNumberedDay, getNumberedMonth, resetAllCells } from "./Utils";
import ClientContext from "../../context/ClientProvider";
import ServiceContext from "../../context/ServiceProvider";
import axios from "axios";
import DaysHeader from "./DaysHeader";
import HoursCol from "./HoursCol";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeekAppointments]);


    const visualizeAppointments = () => {
        currentWeekAppointments && currentWeekAppointments.map(appointment => {
            const time = appointment.time;
            const appointmLength = appointment.serviceTime;
            const rowIndex = hours.indexOf(time);
            const colIndex = new Date(appointment.date).getUTCDay();
            addAppointmentToCell(rowIndex, colIndex, appointmLength, appointment);
        })
    }

    useEffect(() => {
        /* FETCHES THE SERVICE AND CLIENT LIST IF THEY HAVEN'T BEEN FETCHED */
        clients.length === 0 && getClientListAPI();
        services.length === 0 && getServiceListAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeekAppointments]);
    

    const handleTdClick = (cell: HTMLTableCellElement) => {
        const dayIndex = cell.cellIndex;
        const rowIndex = cell.closest('tr')!.rowIndex // Check if it is ok with !

        if (cell.classList.contains('empty')) {
            setNewAppointmentData(prevData => {
                return {
                    ...prevData,
                    date: getDayDataFromDayIndex(dayIndex, currentWeek),
                    time: hours[rowIndex],
                }
            })
            setOpenAddAppointmentDialog(true);
            setEmptyRowsForServiceLength(countEmptyRows(rowIndex, dayIndex)); // Checks how many empty rows are after the filled cell (for service filter by available time)
        }
        else if (cell.classList.contains('full')) {
            currentWeekAppointments && currentWeekAppointments.map(appointment => {
                const appointmentRowIndex = hours.indexOf(appointment.time);
                const appointmentDayIndex = new Date(appointment.date).getUTCDay() - 1; // Because getUTCDay returns 1 on monday

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
            const cell = document.getElementsByTagName('tr')[rowIndex + index].getElementsByTagName('td')[colIndex];
            if (cell.classList.contains('full')) {
                break;
            } else {
                numberOfEmptyCells++;
            }
        }
        return numberOfEmptyCells;
    }

    return (
        <section id='calendar-section'>
            <h1 className='page-title'>Időpontok</h1>
            <WeekPicker />
            <section className="bg-white py-4 px-2 rounded-xl my-4 shadow-md m-auto w-[600px] sm:w-[800px] lg:w-[1100px] overflow-x-scroll max-w-full">
                <DaysHeader currentWeek={currentWeek}/>
                <div className="flex flex-row">
                <HoursCol/>
                <table className="text-center min-w-[600px] w-full">
                    <tbody >
                        {hours.map((hour, index) => (
                            <tr key={index} className="[&:nth-child(4n+1)]:text-sm">
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]'></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]' hidden={hideSaturday}></td>
                                <td className='empty border-[1px] hover:cursor-pointer h-[45px]' hidden={hideSunday}></td>
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

