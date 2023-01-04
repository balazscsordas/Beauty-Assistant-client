import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getWeekDates } from "../components/appointment/Utils";
import { NewAppointmentInterface, WeekdaysInterface } from "../interfaces/AppointmentInterfaces";

type Props = {
    children: ReactNode
}
interface AppointmentContextInterface {
    currentWeek: WeekdaysInterface;
    newAppointmentData: NewAppointmentInterface;
    openAddAppointmentDialog: boolean;
    setCurrentWeek: React.Dispatch<React.SetStateAction<WeekdaysInterface>>;
    setNewAppointmentData: React.Dispatch<React.SetStateAction<NewAppointmentInterface>>
    setOpenAddAppointmentDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentContext = createContext<AppointmentContextInterface>({} as AppointmentContextInterface);

export const AppointmentProvider = ({ children }: Props) => {

    const [currentWeek, setCurrentWeek] = useState<WeekdaysInterface>(getWeekDates());
    const [newAppointmentData, setNewAppointmentData] = useState({
        date: new Date(),
        hour: 0,
        minute: 0,
        clientId: "",
        serviceId: ""
    });
    const [openAddAppointmentDialog, setOpenAddAppointmentDialog] = useState(false);

    return (
        <AppointmentContext.Provider value={{ 
                                            currentWeek,
                                            newAppointmentData,
                                            openAddAppointmentDialog,
                                            setCurrentWeek, 
                                            setOpenAddAppointmentDialog,
                                            setNewAppointmentData,
                                            }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContext;