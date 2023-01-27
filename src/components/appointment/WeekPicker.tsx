import { useContext } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { prevWeek, getNamedMonth, nextWeek } from "./Utils";
import { IconButton } from '@mui/material';
import AppointmentContext from '../../context/AppointmentProvider';
import axios from 'axios';
import { WeekdaysInterface } from '../../interfaces/AppointmentInterfaces';

const WeekPicker = () => {

    const {currentWeek, setCurrentWeek, setCurrentWeekAppointments} = useContext(AppointmentContext);

    const goToPrevWeek = () => {
        const prevWeekValue = prevWeek(currentWeek);
        setCurrentWeek(prevWeekValue);
        fetchWeekData(prevWeekValue);
    }

    const goToNextWeek = () => {
        const nextWeekValue = nextWeek(currentWeek);
        setCurrentWeek(nextWeekValue);
        fetchWeekData(nextWeekValue);
    }

    const fetchWeekData = async (week: WeekdaysInterface) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/get-appointment-list";
        const options = {
            params: { week },
            withCredentials: true
        }
        const response = await axios.get(url, options);
        setCurrentWeekAppointments(response.data.currentWeekAppointments);
    }

    return (
        <div id='week-picker' className="max-w-sm mb-4 mx-auto text-center font-semibold">
            <div className='year-block'>
                {currentWeek.monday.getFullYear() === currentWeek.sunday.getFullYear()
                    ? <h4>{currentWeek.monday.getFullYear()}</h4> 
                    : <h4>{currentWeek.monday.getFullYear() + ' - ' + currentWeek.sunday.getFullYear()}</h4>
                }
            </div>
            <div className='flex flex-row items-center justify-between'>
                <IconButton className='ease-in-out duration-200 hover:scale-110 cursor-pointer' onClick={goToPrevWeek}>
                    <KeyboardArrowLeftIcon />
                </IconButton> 
                
                <h4 className="mb-0">{getNamedMonth(currentWeek.monday) + ' ' + currentWeek.monday.getDate() + ' - ' + getNamedMonth(currentWeek.sunday) + ' ' + currentWeek.sunday.getDate()}</h4>
                <IconButton className='ease-in-out duration-200 hover:scale-110 cursor-pointer' onClick={goToNextWeek}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WeekPicker;