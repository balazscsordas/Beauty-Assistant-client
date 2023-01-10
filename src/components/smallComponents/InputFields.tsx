import { TextField } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"

interface Props {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string,
    nameVal?: string
    type?: HTMLInputTypeAttribute
}

export const OneLineReqAutoFocusInput = ({ inputRef, value, onChange, nameVal, label, type }: Props) => {
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
            autoComplete={nameVal}
            type={type}
        />
    )
}

export const OneLineReqInput = ({ inputRef, value, onChange, nameVal, label, type }: Props) => {
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
            autoComplete={nameVal}
            type={type}
        />
    )
}

export const OneLineNonReqInput = ({ inputRef, value, onChange, nameVal, label, type }: Props) => {
    return (
        <TextField
            margin="normal"
            onChange={onChange}
            fullWidth
            inputRef={inputRef}
            value={value}
            label={label}
            name={nameVal}
            autoComplete={nameVal}
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