import { Collapse } from "@mui/material";
import React, { useRef, useState } from "react";

const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const minutes = ['00', '15', '30', '45' ];

type Props = {
    day: string
}

const HourBlock = ({ day }: Props) => {

    const [time, setTime] = useState({
        timeFrom: "",
        timeTo: "",
    })

    const input1Ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const input2Ref = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTime(prevValues => {
            return {
                ...prevValues,
                [name]: value,
            }
        })
        checkFormat(value);
    }


    const checkFormat = (input: string) => {
        const minute = input.split(':')[1];
        const hour = input.split(':')[0];
        if (minute && minutes.includes(minute) && hours.includes(hour)) {
            input2Ref.current.focus();
        }
    }

    return (
        <section>
            <div className='setting-block'>
                <p className='setting-name'>{day}</p>
                <div className="input-fields">
                    <input placeholder='8:00' type="text" name="timeFrom" ref={input1Ref} onChange={handleChange} value={time.timeFrom}/>
                    <span>-</span>
                    <input placeholder='17:00' type="text" name="timeTo" ref={input2Ref} onChange={handleChange} value={time.timeTo}/>
                </div>
            </div>
            <Collapse in={showErrorMessage}>
                <p className="error-text">Nem megfelelő formátum.</p>
            </Collapse>
        </section>
    )
}

export default HourBlock;