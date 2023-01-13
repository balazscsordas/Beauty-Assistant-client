export interface ServiceListInterface {
    _id?: string;
    time?: string;
    name: string;
    category: string;
}

export interface ServiceDataInterface extends ServiceListInterface{
    price: number;
    description: string;
    steps: string;
}

export interface ServiceCategories {
    _id?: string;
    name: string;
}