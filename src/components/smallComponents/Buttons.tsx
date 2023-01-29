import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface Props {
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    addIcon?: boolean,
    disabled?: boolean,
}

export const BasicPrimaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base primary'
            type={type}
            onClick={onClick}
            disabled={disabled}
            >{text}
        </button>
    )
}

export const AddIconPrimaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base primary'
            type={type}
            onClick={onClick}
            disabled={disabled}
            ><AddCircleOutlineIcon/>{text}
        </button>
    )
}

export const BasicSecondaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <button 
            id='secondary-button'
            className='base secondary'
            type={type}
            onClick={onClick}
            disabled={disabled}
            >{text}
        </button>
    )
}

export const AddIconOptionButton = ({ text, type="button", onClick, addIcon, disabled }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base option'
            type={type}
            onClick={onClick}
            disabled={disabled}
            >{!addIcon ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}{text}
        </button>
    )
}

interface CheckboxButton extends Props {
    checked: boolean,
    nameVal: string,
}

export const CheckboxButton = ({ text, type="button", onClick, checked, nameVal }: CheckboxButton) => {
    return (
        <button
            name={nameVal}
            type={type}
            onClick={onClick}
            className='base'
            >{checked ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}{text}
        </button>
    )
}