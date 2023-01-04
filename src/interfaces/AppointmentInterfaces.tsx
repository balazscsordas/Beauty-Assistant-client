import { SetStateAction } from "react"

export interface WeekdaysInterface {
    sunday: Date,
    monday: Date,
    tuesday: Date,
    wednesday: Date,
    thurstday: Date,
    friday: Date,
    saturday: Date,
}

export interface AppointmentSearchResInterface {
    _id?: string,
    name: string
}

export interface NewAppointmentInterface {
    date: Date,
    hour: number,
    minute: number,
    clientId: string,
    serviceId: string
}