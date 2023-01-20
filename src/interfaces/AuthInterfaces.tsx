export interface AuthInterface {
    _id: string;
    firstName: string;
    accessToken: string;
}

export interface RegistrationDataInterface {
    firstName: string;
    email: string;
    password: string;
}