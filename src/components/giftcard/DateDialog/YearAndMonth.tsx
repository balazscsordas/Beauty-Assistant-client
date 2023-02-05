import { IconButton } from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Dispatch, SetStateAction, useContext } from "react";
import { formatYearAndMonth, goToNextMonth, goToPrevMonth } from "../Utils";
import LangContext from "../../../context/LanguageProvider";

interface Props {
    giftcardDate: Date,
    setGiftcardDate: Dispatch<SetStateAction<Date>>,
}

const YearAndMonth = ({ giftcardDate, setGiftcardDate }: Props) => {

    const { lang } = useContext(LangContext);
    const changeStartDateToPrevMonth = () => {
        const prevMonth = goToPrevMonth(giftcardDate);
        setGiftcardDate(prevMonth);
    }

    const changeStartDateToNextMonth = () => {
        const nextMonth = goToNextMonth(giftcardDate);
        setGiftcardDate(nextMonth);
    }

    return (
        <div className="flex flex-row p-1 border-b-2 border-black">
            <div className="flex items-center font-semibold">
                <p className="m-0">{formatYearAndMonth(giftcardDate, lang)}</p>
            </div>
            <div className="flex ml-auto items-center">
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