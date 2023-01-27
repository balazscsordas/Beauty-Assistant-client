import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DateBlock from "./DateBlock";
import { BasicPrimaryButton, BasicSecondaryButton } from "../../smallComponents/Buttons";

interface Props {
    label: string,
    showDateDialog: boolean,
    setShowDateDialog: Dispatch<SetStateAction<boolean>>,
    giftcardDate: Date,
    setGiftcardDate: Dispatch<SetStateAction<Date>>,
}

const DatePickerDialog = ({ label, showDateDialog, setShowDateDialog, setGiftcardDate, giftcardDate }: Props) => {

    const closeDateDialog = () => {
        setShowDateDialog(false);
    }

    const setTodayAsDate = () => {
        const today = new Date();
        today.setHours(12);
        setGiftcardDate(today);
        setShowDateDialog(false);
    }
 
    return (
        <section>
            <Dialog id="date-dialog" open={showDateDialog} onClose={() => setShowDateDialog(false)}>
                <DialogTitle className="text-center">{label}</DialogTitle>
                <DialogContent>
                    <DateBlock giftcardDate={giftcardDate} setGiftcardDate={setGiftcardDate} setShowDateDialog={setShowDateDialog}/>
                </DialogContent>
                <DialogActions className="flex flex-row py-4 px-6 justify-between">
                    <BasicSecondaryButton onClick={closeDateDialog} text="Mégse"/>
                    <BasicPrimaryButton onClick={setTodayAsDate} text="Mai nap"/>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default DatePickerDialog;