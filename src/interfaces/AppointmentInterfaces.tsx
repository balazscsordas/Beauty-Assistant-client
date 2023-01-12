
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

export interface AppointmentInterface {
    _id: string,
    status: string,
    date: Date,
    time: string,
    clientId: string,
    clientName: string,
    serviceId: string,
    serviceName: string,
    discount: string,
    serviceTime: number,
    commentForAdmin: string,
    commentForClient: string,
}