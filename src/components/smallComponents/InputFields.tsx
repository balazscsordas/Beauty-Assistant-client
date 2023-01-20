import { IconButton, InputAdornment, TextField } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    label?: string,
    nameVal?: string
    type?: HTMLInputTypeAttribute,
    autoComplete?: string,
}

export const OneLineReqAutoFocusInput = ({ inputRef, value, onChange, nameVal, label, type, autoComplete }: Props) => {
    return (
        <TextField
            margin="normal"
            required
            onChange={onChange}
            fullWidth
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
            autoFocus
            autoComplete={autoComplete}
            type={type}
        />
    )
}

export const OneLineReqAutoFocusInputWithAdornment = ({ inputRef, value, onChange, nameVal, label, type, autoComplete, onClick }: Props) => {
    return (
        <TextField
            margin="normal"
            required
            onChange={onChange}
            fullWidth
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
            autoFocus
            autoComplete={autoComplete}
            type={type}
            InputProps={{
                endAdornment: 
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={onClick}
                            edge="end"
                            >
                            <AddCircleIcon />
                        </IconButton>
                    </InputAdornment>
              }}
        />
    )
}

export const OneLineReqInput = ({ inputRef, value, onChange, nameVal, label, type, autoComplete }: Props) => {
    return (
        <TextField
            margin="normal"
            required
            onChange={onChange}
            fullWidth
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
            autoComplete={autoComplete}
            type={type}
        />
    )
}

export const OneLineNonReqInput = ({ inputRef, value, onChange, nameVal, label, type, autoComplete }: Props) => {
    return (
        <TextField
            margin="normal"
            onChange={onChange}
            fullWidth
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
            autoComplete={autoComplete}
            type={type}
        />
    )
}

export const MultilineNonReqInput = ({ inputRef, value, onChange, nameVal, label }: Props) => {
    return (
        <TextField
            margin="normal"
            onChange={onChange}
            fullWidth
            minRows={3}
            multiline
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
        />
    )
}