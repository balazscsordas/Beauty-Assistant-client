import { useContext, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { prevWeek, getNamedMonth, nextWeek } from "./Utils";
import { IconButton } from '@mui/material';
import AppointmentContext from '../../context/AppointmentProvider';
import axios from 'axios';
import { WeekdaysInterface } from '../../interfaces/AppointmentInterfaces';
import LangContext from '../../context/LanguageProvider';

const WeekPicker = () => {

    const { lang } = useContext(LangContext);
    const {currentWeek, setCurrentWeek, setCurrentWeekAppointments} = useContext(AppointmentContext);
    const controller = new AbortController();
    const { signal } = controller;

    const goToPrevWeek = () => {
        const prevWeekValue = prevWeek(currentWeek);
        setCurrentWeek(prevWeekValue);
    }

    const goToNextWeek = () => {
        const nextWeekValue = nextWeek(currentWeek);
        setCurrentWeek(nextWeekValue);
    }

    useEffect(() => {
        fetchWeekData(currentWeek);
        return () => {
            controller.abort();
        }
    }, [currentWeek.monday])

    const fetchWeekData = async (week: WeekdaysInterface) => {
        
        try {
            const controller = new AbortController();
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/get-appointment-list";
            const response = await axios.post(url, { week }, { withCredentials: true, signal });
            setCurrentWeekAppointments(response.data.currentWeekAppointments);
        } catch(err) {
            err instanceof Error && console.log(err.message);
        }
        
    }

    return (
        <div className="max-w-md mb-6 mx-auto text-center font-semibold">
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
                
                <h4 className="mb-0">{getNamedMonth(currentWeek.monday, lang) + ' ' + currentWeek.monday.getDate() + ' - ' + getNamedMonth(currentWeek.sunday, lang) + ' ' + currentWeek.sunday.getDate()}</h4>
                <IconButton className='ease-in-out duration-200 hover:scale-110 cursor-pointer' onClick={goToNextWeek}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WeekPicker;