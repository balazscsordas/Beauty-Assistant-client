import { useContext } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { prevWeek, getNamedMonth, getWeekDates, nextWeek } from "./Utils";
import { IconButton } from '@mui/material';
import AppointmentContext from '../../context/AppointmentProvider';

const WeekPicker = () => {

    const {currentWeek, setCurrentWeek} = useContext(AppointmentContext);

    const goToPrevWeek = () => {
        setCurrentWeek(prevWeek(currentWeek));
    }

    const goToNextWeek = () => {
        setCurrentWeek(nextWeek(currentWeek));
    }

    return (
        <div id='week-picker'>
            <div className='year-block'>
                {currentWeek.monday.getFullYear() === currentWeek.sunday.getFullYear()
                    ? <h3>{currentWeek.monday.getFullYear()}</h3> 
                    : <h3>{currentWeek.monday.getFullYear() + ' - ' + currentWeek.sunday.getFullYear()}</h3>
                }
            </div>
            <div className='month-day-block'>
                <IconButton className='icon' onClick={goToPrevWeek}>
                    <KeyboardArrowLeftIcon />
                </IconButton> 
                
                <h3>{getNamedMonth(currentWeek.monday) + ' ' + currentWeek.monday.getDate() + ' - ' + getNamedMonth(currentWeek.sunday) + ' ' + currentWeek.sunday.getDate()}</h3>
                <IconButton className='icon' onClick={goToNextWeek}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WeekPicker;