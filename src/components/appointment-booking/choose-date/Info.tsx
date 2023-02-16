import { useContext } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import LangContext from '../../../context/LanguageProvider';

const Info = () => {

    const { lang } = useContext(LangContext);

    return (
        <div className="m-auto my-4">
            <div className="flex flex-row items-center mb-2">
                <CircleIcon className='text-green-300'/>
                <span className="ml-1 font-semibold">{ lang === 'hun' ? "Szabad időpontok" : "Bookable appointments" }</span>
            </div>
            <div className="flex flex-row items-center">
                <CircleIcon className='text-red-200'/>
                <span className="ml-1 font-semibold">{ lang === 'hun' ? "Foglalt időpontok" : "Booked appointments" }</span>
            </div>
        </div>
    )
}

export default Info;