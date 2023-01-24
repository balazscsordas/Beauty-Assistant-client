import { IconButton, InputAdornment, TextField } from "@mui/material";
import { SetStateAction } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from "./Utils";

interface Props {
    label: string,
    giftcardDate: Date,
    setShowDateDialog: (value: SetStateAction<boolean>) => void
}

const DatePicker = ({ label, giftcardDate, setShowDateDialog }: Props) => {

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
        </>
    )
}

export default DatePicker;