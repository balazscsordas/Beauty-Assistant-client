export interface ServiceListInterface {
    _id?: string;
    name: string;
    category: string;
}

export interface ServiceDataInterface {
    _id?: string;
    name: string;
    category: string;
    price: number;
    time: number;
    description: string;
    steps: string;
}

export interface ServiceCategories {
    _id?: string;
    name: string;
}