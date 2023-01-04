import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getWeekDates } from "../components/appointment/Utils";
import { WeekdaysInterface } from "../interfaces/AppointmentInterfaces";

type Props = {
    children: ReactNode
}
interface WeekdaysContextInterface {
    currentWeek: WeekdaysInterface;
    openAddAppointmentDialog: boolean;
    addAppointmHour: number;
    addAppointmMinute: number;
    addAppointmDate: Date;
    setCurrentWeek: React.Dispatch<React.SetStateAction<WeekdaysInterface>>;
    setOpenAddAppointmentDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setAddAppointmHour: React.Dispatch<React.SetStateAction<number>>;
    setAddAppointmMinute: React.Dispatch<React.SetStateAction<number>>;
    setAddAppointmDate: React.Dispatch<React.SetStateAction<Date>>;
}
const AppointmentContext = createContext<WeekdaysContextInterface>({} as WeekdaysContextInterface);

export const AppointmentProvider = ({ children }: Props) => {

    const [currentWeek, setCurrentWeek] = useState<WeekdaysInterface>(getWeekDates());
    const [openAddAppointmentDialog, setOpenAddAppointmentDialog] = useState(false);
    const [addAppointmHour, setAddAppointmHour] = useState(0);
    const [addAppointmMinute, setAddAppointmMinute] = useState(0);
    const [addAppointmDate, setAddAppointmDate] = useState<Date>(new Date());

    return (
        <AppointmentContext.Provider value={{ 
                                            currentWeek, 
                                            openAddAppointmentDialog,
                                            addAppointmHour,
                                            addAppointmMinute,
                                            addAppointmDate,
                                            setCurrentWeek, 
                                            setOpenAddAppointmentDialog,
                                            setAddAppointmHour,
                                            setAddAppointmMinute,
                                            setAddAppointmDate
                                            }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContext;