
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
    time: string,
    status: string,
    clientId: string,
    serviceId: string,
    discount: string,
    commentForAdmin: string,
    commentForClient: string,
}

export interface AppointmentInterface extends NewAppointmentInterface{
    _id: string,
    clientName: string,
    serviceName: string,
    serviceTime: number,
    servicePrice?: number, // Nem kell elküldeni frontendre, korrigálni!
}