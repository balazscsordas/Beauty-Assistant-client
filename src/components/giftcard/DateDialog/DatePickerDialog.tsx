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
        setGiftcardDate(today);
        setShowDateDialog(false);
    }
 
    return (
        <section>
            <Dialog id="date-dialog" open={showDateDialog} onClose={() => setShowDateDialog(false)}>
                <DialogTitle className="title">{label}</DialogTitle>
                <DialogContent>
                    <DateBlock giftcardDate={giftcardDate} setGiftcardDate={setGiftcardDate} setShowDateDialog={setShowDateDialog}/>
                </DialogContent>
                <DialogActions className="dialog-buttons">
                    <button onClick={closeDateDialog}>Mégse</button>
                    <button className="right-button" onClick={setTodayAsDate}>Mai nap</button>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default DatePickerDialog;