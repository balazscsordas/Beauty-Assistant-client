import React, { createContext, ReactNode, useState } from "react";
import { WeekdaysInterface } from "../interfaces/AppointmentInterfaces";
import { BookAppointmentAppointmentInterface, BookAppointmentDataInterface, BookAppointmentServiceListInterface, SalonDataInterface } from "../interfaces/SalonDataInterface";

type Props = {
    children: ReactNode
}

interface BookAppointmentInterface {
    bookAppointmentData: BookAppointmentDataInterface;
    setBookAppointmentData: React.Dispatch<React.SetStateAction<BookAppointmentDataInterface>>;
    serviceList: BookAppointmentServiceListInterface[];
    setServiceList: React.Dispatch<React.SetStateAction<BookAppointmentServiceListInterface[]>>;
    currentWeekAppointments: BookAppointmentAppointmentInterface[] | null;
    setCurrentWeekAppointments: React.Dispatch<React.SetStateAction<BookAppointmentAppointmentInterface[] | null>>;
    currentWeek: WeekdaysInterface;
    setCurrentWeek: React.Dispatch<React.SetStateAction<WeekdaysInterface>>,
}

const BookAppointmentContext = createContext<BookAppointmentInterface>({} as BookAppointmentInterface);

export const BookAppointmentProvider = ({children}: Props) => {

    const [bookAppointmentData, setBookAppointmentData] = useState<BookAppointmentDataInterface>({
        adminId: "",
        salonName: "",
        serviceId: "",
        serviceName: "",
        serviceLength: 0,
        servicePrice: "",
        date: new Date(),
        time: "",
    })
    const [serviceList, setServiceList] = useState<BookAppointmentServiceListInterface[]>([]);
    const [currentWeekAppointments, setCurrentWeekAppointments] = useState<BookAppointmentAppointmentInterface[] | null>(null)
    const [currentWeek, setCurrentWeek] = useState<WeekdaysInterface>({
        monday: new Date(),
        tuesday: new Date(),
        wednesday: new Date(),
        thurstday: new Date(),
        friday: new Date(),
        saturday: new Date(),
        sunday: new Date()
    });

    return (
        <BookAppointmentContext.Provider value={{ 
                                        bookAppointmentData, 
                                        setBookAppointmentData,
                                        serviceList,
                                        setServiceList,
                                        currentWeekAppointments,
                                        setCurrentWeekAppointments,
                                        currentWeek,
                                        setCurrentWeek
                                    }}>
            {children}
        </BookAppointmentContext.Provider>
    )
}

export default BookAppointmentContext;