import { IconButton } from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Dispatch, SetStateAction, useContext } from "react";
import { formatYearAndMonth, goToNextMonth, goToPrevMonth } from "./Utils";

interface Props {
    giftcardDate: Date,
    setGiftcardDate: Dispatch<SetStateAction<Date>>,
}

const YearAndMonth = ({ giftcardDate, setGiftcardDate }: Props) => {

    const changeStartDateToPrevMonth = () => {
        const prevMonth = goToPrevMonth(giftcardDate);
        setGiftcardDate(prevMonth);
    }

    const changeStartDateToNextMonth = () => {
        const nextMonth = goToNextMonth(giftcardDate);
        setGiftcardDate(nextMonth);
    }

    return (
        <div className="year-and-month-block">
            <div className="year-and-month">
                <p>{formatYearAndMonth(giftcardDate)}</p>
            </div>
            <div className="buttons-block">
                <IconButton onClick={changeStartDateToPrevMonth}>
                    <ArrowLeftIcon/>
                </IconButton>
                <IconButton onClick={changeStartDateToNextMonth}>
                    <ArrowRightIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default YearAndMonth;