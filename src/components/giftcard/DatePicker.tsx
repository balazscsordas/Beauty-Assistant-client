import { Collapse, IconButton, InputAdornment, TextField } from "@mui/material";
import { SetStateAction, useContext } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from "./Utils";
import LangContext from "../../context/LanguageProvider";

interface Props {
    label: string,
    giftcardDate: Date,
    setShowDateDialog: (value: SetStateAction<boolean>) => void,
    showError?: boolean
}

const DatePicker = ({ label, giftcardDate, setShowDateDialog, showError }: Props) => {

    const { lang } = useContext(LangContext);
 
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
                <p className="input-error-text">{ lang === 'hun' ? "A kiválasztott dátum a múltban van!" : "Selected date is in the past!" }</p>
            </Collapse>
        </>
    )
}

export default DatePicker;