import { Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { createNewDateAfterChoosingDay, getCurrentMonthDays, getSpanArray } from "./Utils";

interface Props {
    giftcardDate: Date,
    setGiftcardDate: Dispatch<SetStateAction<Date>>,
    setShowDateDialog: Dispatch<SetStateAction<boolean>>,
}

const DaysOfMonth = ({ giftcardDate, setGiftcardDate, setShowDateDialog }: Props) => {

    const daysOfMonthArray = getCurrentMonthDays(giftcardDate);
    const emptySpanNumber = getSpanArray(giftcardDate);

    const handleClick = (e: React.MouseEvent) => {
        const buttonContent = e.currentTarget.id;
        const newDate = createNewDateAfterChoosingDay(giftcardDate, buttonContent);
        setGiftcardDate(newDate);
        setShowDateDialog(false);
    }

    return (
        <div className="days">
            <>
                {emptySpanNumber.map((index) => (
                    <span key={index}></span>
                ))}
                {daysOfMonthArray.map((element, index) => (
                    <Button 
                        id={element}
                        className="day-button"
                        variant="text" 
                        onClick={handleClick}
                        key={index}>
                            {element}
                    </Button>
                ))}
            </>
        </div>
    )
}

export default DaysOfMonth;