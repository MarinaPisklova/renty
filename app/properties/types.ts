export interface Property {
    _id: string;
    owner: string;
    name: string;
    type: string;
    description: string;
    location: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    };
    beds: number;
    baths: number;
    square_meter: number;
    amenities: string[];
    rates: {
        weekly?: number;
        monthly?: number;
        nightly?: number;
    };
    seller_info: {
        name: string;
        email: string;
        phone: string;
    };
    images: string[];
    is_featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PropertyFields {
    name: string;
    type: string;
    description: string;
    location: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    };
    beds: number;
    baths: number;
    square_meter: number;
    amenities: string[];
    rates: {
        weekly?: number;
        monthly?: number;
        nightly?: number;
    };
    seller_info: {
        name: string;
        email: string;
        phone: string;
    };
    images?: File[] | string[];
}
