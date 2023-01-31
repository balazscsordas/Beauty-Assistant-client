import { Collapse, IconButton, InputAdornment, TextField } from "@mui/material";
import { SetStateAction } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from "./Utils";
import { checkIfDateInPast } from "../smallComponents/InputValidators";

interface Props {
    label: string,
    giftcardDate: Date,
    setShowDateDialog: (value: SetStateAction<boolean>) => void,
    showError?: boolean
}

const DatePicker = ({ label, giftcardDate, setShowDateDialog, showError }: Props) => {
 
    return (
        <>
          <TextField
            label={label}
            margin="normal"
            fullWidth
            value={formatDate(giftcardDate)}
            InputProps={{
                endAdornment: 
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowDateDialog(true)}
                            edge="end"
                            >
                            <CalendarMonthIcon />
                        </IconButton>
                    </InputAdornment>
              }}
          />
            <Collapse in={showError}>
                <p className="input-error-text">A kiválasztott dátum a múltban van!</p>
            </Collapse>
        </>
    )
}

export default DatePicker;