import React, { useContext, useState } from "react";
import GiftcardContext from "../../../context/GiftcardProvider";

interface Props {
    hunName: string;
    engName: string;
}

const StatusFilterItem = ({ hunName, engName }: Props) => {

    const { statusFilterArray, setStatusFilterArray } = useContext(GiftcardContext);
    const [state, setState] = useState(statusFilterArray.includes(engName) ? true : false);
    const [ bg ] = useState(setBgColor(engName));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        checked 
            ? setStatusFilterArray(prevValues => [...prevValues, name]) 
            : setStatusFilterArray(removeItemFromArray(statusFilterArray, name));
        setState(!state);
    }

    function setBgColor (engName: string) {
        if (engName === 'used') {
            return 'bg-green-200';
        }
        if (engName === 'pending') {
            return 'bg-yellow-200';
        }
        return 'bg-red-200'
    }

    const removeItemFromArray = (array: string[], removableItem: string) => {
        const newArray = array.filter(item => {
            return item !== removableItem;
        })
        return newArray;
    }

    return (
        <div className={`${bg} base`}>
            <input className="mr-2" type="checkbox" id={engName} name={engName} checked={state} onChange={handleChange}/>
            <label htmlFor={engName}>{hunName}</label>
        </div>
    )
}

export default StatusFilterItem;