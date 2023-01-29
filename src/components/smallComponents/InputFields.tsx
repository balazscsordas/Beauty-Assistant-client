import { Collapse, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material"
import { HTMLInputTypeAttribute, SetStateAction } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";

interface Props {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    label?: string,
    nameVal?: string
    type?: HTMLInputTypeAttribute,
    autoComplete?: string,
    showError?: boolean,
    errorText?: string,
}

export const OneLineReqInputWithAdornment = ({ inputRef, value, onChange, nameVal, label, type, autoComplete, onClick, showError, errorText }: Props) => {
    return (
        <>
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
            <Collapse in={showError}>
                <p className="input-error-text">{errorText}</p>
            </Collapse>
            </>
    )
}

export const OneLineReqInput = ({ inputRef, value, onChange, nameVal, label, type, autoComplete, showError, errorText }: Props) => {
    return (
        <>
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
            <Collapse in={showError}>
                <p className="input-error-text">{errorText}</p>
            </Collapse>
        </>
    )
}

export const OneLineNonReqInput = ({ inputRef, value, onChange, nameVal, label, type, autoComplete, showError, errorText }: Props) => {
    return (
        <>
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
            <Collapse in={showError}>
                <p className="input-error-text">{errorText}</p>
            </Collapse>
        </>
    )
}

export const MultilineNonReqInput = ({ inputRef, value, onChange, nameVal, label, showError, errorText }: Props) => {
    return (
        <>
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
            <Collapse in={showError}>
                <p className="input-error-text">{errorText}</p>
            </Collapse>
        </>
    )
}

interface SelectInputField extends Props {
    setInputData: React.Dispatch<SetStateAction<GiftcardInterface>>
}

export const SelectInputFieldGiftcard = ({ label, value, nameVal, setInputData }: SelectInputField) => {

    const statuses = [
        {
            name: 'expired',
            content: 'Lejárt'
        },
        {
            name: 'pending',
            content: 'Függőben'
        },
        {
            name: 'used',
            content: 'Felhasznált'
        }
    ];

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputData(prevValues => {
            return {
                ...prevValues,
                status: value,
            }
        });
    }

    return (
        <TextField
            margin="normal"
            required
            select
            fullWidth
            value={value}
            onChange={handleStatusChange}
            label={label}
            name={nameVal}
            >
            {statuses.map((status, index) => (
                <MenuItem key={index} value={status.name}>
                    {status.content}
                </MenuItem>
            ))}
        </TextField>
    )
}

interface BasicSelectInputField extends Props {
    array: string[];
}

export const BasicSelectInputField = ({ label, value, nameVal, onChange, array }: BasicSelectInputField) => {

    return (
        <TextField
            margin="normal"
            required
            select
            fullWidth
            value={value}
            onChange={onChange}
            label={label}
            name={nameVal}
            >
            {array.map((item, index) => (
                <MenuItem key={index} value={item}>
                    {item}
                </MenuItem>
            ))}
        </TextField>
    )
}