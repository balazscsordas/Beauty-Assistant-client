import React, { useContext, useState } from "react";
import AppointmentContext from "../../../context/AppointmentProvider";

const StatusChanger = () => {

    const { editAppointmentData, setEditAppointmentData } = useContext(AppointmentContext);
    const appointmentStatus: string = editAppointmentData.status;

    const [failureChecked, setFailureChecked] = useState(appointmentStatus === 'failure' ? true : false)
    const [pendingChecked, setPendingChecked] = useState(appointmentStatus === 'pending' ? true : false)
    const [successChecked, setSuccessChecked] = useState(appointmentStatus === 'success' ? true : false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === 'failure') {
            setSuccessChecked(false);
            setPendingChecked(false);
            setFailureChecked(true);
            changeEditAppointmentStatus('failure');
        }
        else if (name === 'success') {
            setSuccessChecked(true);
            setPendingChecked(false);
            setFailureChecked(false);
            changeEditAppointmentStatus('success');
        } 
        else if (name === 'pending') {
            setSuccessChecked(false);
            setPendingChecked(true);
            setFailureChecked(false);
            changeEditAppointmentStatus('pending');
        } 
    }

    const changeEditAppointmentStatus = (status: string) => {
        setEditAppointmentData(prevValues => {
            return {
                ...prevValues,
                status: status
            }
        })
    }

    return (
        <section id="appointment-status-changer">
            <p>Státusz</p>
            <div>
                <input type='checkbox' name="failure" onChange={handleChange} checked={failureChecked}></input>
                <label>Nem jött el</label>

                <input type='checkbox' name="pending" onChange={handleChange} checked={pendingChecked}></input>
                <label>Függőben</label>
                    
                <input type='checkbox' name="success" onChange={handleChange} checked={successChecked}></input>
                <label>Eljött</label>
            </div>            
        </section>
    )
}

export default StatusChanger;