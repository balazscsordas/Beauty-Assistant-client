import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
    name: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const SearchbarResultItem = ({ name, onClick }: Props) => {
    return (
        <div className="bg-green-300 my-2 rounded-lg flex flex-row justify-between items-center shadow-sm">
            <button 
                type="button"
                className="w-full rounded-md text-sm font-medium flex flex-row justify-between py-2 px-3 items-center"
                onClick={onClick}
            ><span>{name}</span><AddCircleOutlineIcon/>
        </button>
        </div>
    )
}

export default SearchbarResultItem