import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { getCurrentWeekDates } from "../components/appointment/Utils";
import { AppointmentInterface, NewAppointmentInterface, WeekdaysInterface } from "../interfaces/AppointmentInterfaces";

type Props = {
    children: ReactNode
}
interface AppointmentContextInterface {
    currentWeek: WeekdaysInterface;
    newAppointmentData: NewAppointmentInterface;
    openAddAppointmentDialog: boolean;
    openEditAppointmentDialog: boolean;
    hideSaturday: boolean;
    hideSunday: boolean;
    editAppointmentData: AppointmentInterface,
    currentWeekAppointments: AppointmentInterface[] | null,
    emptyRowsForServiceLength: number | null,
    setCurrentWeek: React.Dispatch<React.SetStateAction<WeekdaysInterface>>,
    setNewAppointmentData: React.Dispatch<React.SetStateAction<NewAppointmentInterface>>,
    setOpenAddAppointmentDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenEditAppointmentDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setHideSaturday: React.Dispatch<React.SetStateAction<boolean>>,
    setHideSunday: React.Dispatch<React.SetStateAction<boolean>>,
    setEditAppointmentData: React.Dispatch<React.SetStateAction<AppointmentInterface>>,
    setCurrentWeekAppointments: React.Dispatch<React.SetStateAction<AppointmentInterface[] | null>>,
    setEmptyRowsForServiceLength: React.Dispatch<React.SetStateAction<number | null>>
}

const AppointmentContext = createContext<AppointmentContextInterface>({} as AppointmentContextInterface);

export const AppointmentProvider = ({ children }: Props) => {

    const todayGetDay = (new Date()).getDay();
    const current = useMemo(() => getCurrentWeekDates(todayGetDay), [todayGetDay])
    const [currentWeek, setCurrentWeek] = useState<WeekdaysInterface>(current);

    const [newAppointmentData, setNewAppointmentData] = useState({
        date: new Date(),
        time: "",
        status: "pending",
        clientId: "",
        serviceId: "",
        discount: "",
        commentForAdmin: "",
        commentForClient: "",
    });
    const [editAppointmentData, setEditAppointmentData] = useState({
        _id: "",
        status: "",
        date: new Date(),
        time: "",
        clientId: "",
        clientName: "",
        serviceId: "",
        serviceName: "",
        serviceTime: 0,
        discount: "",
        commentForAdmin: "",
        commentForClient: "",
    });
    const [openAddAppointmentDialog, setOpenAddAppointmentDialog] = useState(false);
    const [openEditAppointmentDialog, setOpenEditAppointmentDialog] = useState(false);
    const [hideSaturday, setHideSaturday] = useState(false);
    const [hideSunday, setHideSunday] = useState(false);
    const [currentWeekAppointments, setCurrentWeekAppointments] = useState<AppointmentInterface[] | null>(null)
    const [emptyRowsForServiceLength, setEmptyRowsForServiceLength] = useState<number | null>(null);

    useEffect(() => {
        if (!localStorage.getItem('hideSaturday')) {
            localStorage.setItem('hideSaturday', "false");
            setHideSaturday(false);
        }
        else if(localStorage.getItem('hideSaturday') === "true") {
            setHideSaturday(true);
        }
        else if(localStorage.getItem('hideSaturday') === "false") {
            setHideSaturday(false);
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('hideSunday')) {
            localStorage.setItem('hideSunday', "false");
            setHideSunday(false);
        }
        else if(localStorage.getItem('hideSunday') === "true") {
            setHideSunday(true);
        }
        else if(localStorage.getItem('hideSunday') === "false") {
            setHideSunday(false);
        }
    }, []);

    return (
        <AppointmentContext.Provider value={{ 
                                            currentWeek,
                                            newAppointmentData,
                                            openAddAppointmentDialog,
                                            openEditAppointmentDialog,
                                            hideSaturday,
                                            hideSunday,
                                            editAppointmentData,
                                            currentWeekAppointments,
                                            emptyRowsForServiceLength,
                                            setCurrentWeek, 
                                            setOpenAddAppointmentDialog,
                                            setNewAppointmentData,
                                            setOpenEditAppointmentDialog,
                                            setHideSaturday,
                                            setHideSunday,
                                            setEditAppointmentData,
                                            setCurrentWeekAppointments,
                                            setEmptyRowsForServiceLength
                                            }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContext;