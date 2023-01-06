import { useContext } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { prevWeek, getNamedMonth, nextWeek } from "./Utils";
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
                    ? <h4>{currentWeek.monday.getFullYear()}</h4> 
                    : <h4>{currentWeek.monday.getFullYear() + ' - ' + currentWeek.sunday.getFullYear()}</h4>
                }
            </div>
            <div className='month-day-block'>
                <IconButton className='icon' onClick={goToPrevWeek}>
                    <KeyboardArrowLeftIcon />
                </IconButton> 
                
                <h4>{getNamedMonth(currentWeek.monday) + ' ' + currentWeek.monday.getDate() + ' - ' + getNamedMonth(currentWeek.sunday) + ' ' + currentWeek.sunday.getDate()}</h4>
                <IconButton className='icon' onClick={goToNextWeek}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WeekPicker;