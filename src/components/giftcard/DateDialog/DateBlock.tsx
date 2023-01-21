import { Dispatch, SetStateAction } from "react";
import DaysOfMonth from "./DaysOfMonth";
import WeekdaysName from "./WeekdaysName";
import YearAndMonth from "./YearAndMonth";

interface Props {
    giftcardDate: Date,
    setGiftcardDate: Dispatch<SetStateAction<Date>>,
    setShowDateDialog: Dispatch<SetStateAction<boolean>>,
}

const DateBlock = ({ giftcardDate, setGiftcardDate, setShowDateDialog }: Props) => {

    return (
        <section>
            <YearAndMonth giftcardDate={giftcardDate} setGiftcardDate={setGiftcardDate}/>
            <WeekdaysName/>
            <DaysOfMonth giftcardDate={giftcardDate} setGiftcardDate={setGiftcardDate} setShowDateDialog={setShowDateDialog}/>
        </section>
    )
}

export default DateBlock;