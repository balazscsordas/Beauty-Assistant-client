import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CircularProgress } from '@mui/material';

interface Props {
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    addIcon?: boolean,
    disabled?: boolean,
}

export const BasicPrimaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <div className='relative inline-block'>
            <button 
                className='base primary'
                type={type}
                onClick={onClick}
                disabled={disabled}
                >{text}
            </button>
            {disabled && 
                <span className='absoluteCenter flex justify-center'>
                    <CircularProgress className='text-green-500' thickness={4} size={20}/>
                </span> 
            }
        </div>
    )
}


export const AddIconPrimaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <div className='relative inline-block'>
            <button 
                className='base primary'
                type={type}
                onClick={onClick}
                disabled={disabled}
                ><AddCircleOutlineIcon/>{text}
                {disabled && 
                    <span className='absoluteCenter flex justify-center'>
                        <CircularProgress className='text-green-500' thickness={4} size={20}/>
                    </span> 
                }
            </button>
        </div>
    )
}

export const BasicSecondaryButton = ({ text, type="button", onClick, disabled }: Props) => {
    return (
        <div className='relative inline-block'>
            <button 
                className='base secondary'
                type={type}
                onClick={onClick}
                disabled={disabled}
                >{text}
            </button>
            {disabled && 
                <span className='absoluteCenter flex justify-center'>
                    <CircularProgress className='text-green-500' thickness={4} size={20}/>
                </span> 
            }
        </div>
    )
}

export const AddIconOptionButton = ({ text, type="button", onClick, addIcon, disabled }: Props) => {
    return (
        <div className='relative inline-block'>
            <button 
                className='base option'
                type={type}
                onClick={onClick}
                disabled={disabled}
                >{!addIcon ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}{text}
            </button>
            {disabled && 
                <span className='absoluteCenter flex justify-center'>
                    <CircularProgress className='text-green-500' thickness={4} size={20}/>
                </span> 
            }
        </div>
    )
}

interface CheckboxButton extends Props {
    checked: boolean,
    nameVal: string,
}

export const CheckboxButton = ({ text, type="button", onClick, checked, nameVal, disabled}: CheckboxButton) => {
    return (
        <div className='relative inline-block'>
            <button
                name={nameVal}
                type={type}
                onClick={onClick}
                className='uppercase rounded-full bg-slate-100 m-1 text-sm px-4 py-2 flex items-center font-medium shadow-md border-blue-300 border-2'
                >{checked ? <CheckBoxIcon fontSize='small' className='mr-1'/> : <CheckBoxOutlineBlankIcon fontSize='small' className='mr-1'/>}{text}
            </button>
            {disabled && 
                <span className='absoluteCenter flex justify-center'>
                    <CircularProgress className='text-green-500' thickness={4} size={20}/>
                </span> 
            }
        </div>

    )
}