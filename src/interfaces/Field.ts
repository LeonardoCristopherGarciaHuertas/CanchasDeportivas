export interface Field {
    id: number;
    name: string;
    location: string;
    availability: boolean;
    description?: string;
    images?: string[];
}