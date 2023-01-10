import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    addIcon?: boolean
}

export const BasicPrimaryButton = ({ text, type="button", onClick }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base primary'
            type={type}
            onClick={onClick}
            >{text}
        </button>
    )
}

export const AddIconPrimaryButton = ({ text, type="button", onClick }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base primary'
            type={type}
            onClick={onClick}
            ><AddCircleOutlineIcon/>{text}
        </button>
    )
}

export const BasicSecondaryButton = ({ text, type="button", onClick }: Props) => {
    return (
        <button 
            id='secondary-button'
            className='base secondary'
            type={type}
            onClick={onClick}
            >{text}
        </button>
    )
}

export const AddIconOptionButton = ({ text, type="button", onClick, addIcon }: Props) => {
    return (
        <button 
            id='primary-button'
            className='base option'
            type={type}
            onClick={onClick}
            >{!addIcon ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}{text}
        </button>
    )
}