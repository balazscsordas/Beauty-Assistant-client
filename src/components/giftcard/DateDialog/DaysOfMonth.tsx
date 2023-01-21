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
        <div className="flex flex-wrap flex-row min-h-max">
            <>
                {emptySpanNumber.map((index) => (
                    <span className="flex p-0 items-center text-sm w-[14.28%] h-10 rounded-full" key={index}></span>
                ))}
                {daysOfMonthArray.map((element, index) => (
                    <Button className="flex p-0 items-center text-sm w-[14.28%] h-10 rounded-full"
                        id={element}
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