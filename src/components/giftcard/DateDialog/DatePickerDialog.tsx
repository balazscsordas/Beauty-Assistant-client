import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DateBlock from "./DateBlock";

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
                <DialogActions className="flex flex-row justify-start py-4 px-6">
                    <button onClick={closeDateDialog}>Mégse</button>
                    <button className="ml-auto" onClick={setTodayAsDate}>Mai nap</button>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default DatePickerDialog;