import React, { useContext, useState } from "react";
import AppointmentContext from "../../../context/AppointmentProvider";
import LangContext from "../../../context/LanguageProvider";
import { CheckboxButton } from "../../smallComponents/Buttons";

const StatusChanger = () => {

    const { lang } = useContext(LangContext);
    const { editAppointmentData, setEditAppointmentData } = useContext(AppointmentContext);

    const [failureChecked, setFailureChecked] = useState(editAppointmentData.status === 'failure' ? true : false)
    const [pendingChecked, setPendingChecked] = useState(editAppointmentData.status === 'pending' ? true : false)
    const [successChecked, setSuccessChecked] = useState(editAppointmentData.status === 'success' ? true : false)

    const changeEditAppointmentStatus = (status: string) => {
        setEditAppointmentData(prevValues => {
            return {
                ...prevValues,
                status: status
            }
        })
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {   
        const { name } = e.currentTarget;
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

    return (
        <section className="mb-6">
            <div className="flex flex-wrap justify-evenly">
                <CheckboxButton 
                    nameVal="failure" 
                    text={ lang === 'hun' ? "Nem jött el" : "Not used" }
                    onClick={handleClick} 
                    checked={editAppointmentData.status === 'failure' ? true : false} 
                />
                <CheckboxButton 
                    nameVal="pending" 
                    text={ lang === 'hun' ? "Függőben" : "pending" }
                    onClick={handleClick} 
                    checked={editAppointmentData.status === 'pending' ? true : false} 
                />
                <CheckboxButton 
                    nameVal="success" 
                    text={ lang === 'hun' ? "Eljött" : "used" }
                    onClick={handleClick} 
                    checked={editAppointmentData.status === 'success' ? true : false} 
                />
            </div>            
        </section>
    )
}

export default StatusChanger;