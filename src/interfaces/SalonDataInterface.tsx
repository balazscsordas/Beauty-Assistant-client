export interface SalonDataInterface {
    name: string;
    professions: string;
    city: string;
    address: string;
    adminId: string;
}

export interface BookAppointmentDataInterface {
    clientName: string;
    clientEmail: string;
    adminId: string;
    salonName: string;
    serviceId: string;
    serviceName: string;
    serviceLength: number;
    servicePrice: string;
    date: Date;
    time: string;
}

export interface BookAppointmentServiceListInterface {
    _id: string;
    name: string;
    time: number;
    price: string;
}

export interface BookAppointmentAppointmentInterface {
    _id: string;
    date: Date;
    time: string;
    serviceTime: number;
}