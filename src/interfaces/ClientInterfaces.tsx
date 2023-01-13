export interface ClientListInterface {
    _id?: string;
    name: string;
    age: string;
}

// NewClientInterface
// ClientInterface
// ClientOptionNamesInterface

export interface ClientDataInterface {
    _id?: string;
    name: string;
    age: string;
    email: string;
    mobileNumber: string;
    option1Content: string;
    option2Content: string;
    option3Content: string;
    option4Content: string;
    option5Content: string;
}

export interface ClientOptionNamesInterface {
    option1Name: string;
    option2Name: string;
    option3Name: string;
    option4Name: string;
    option5Name: string;
}