export interface ServiceListInterface {
    _id?: string;
    time?: number;
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