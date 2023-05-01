export interface User {
    id: string;
    name: Name;
    email: string;
    image: string;
    location: Location;
}

export interface UserState {
    users: User[];
}

export interface Name {
    first: string;
    last: string;
    title?: string;
}

export function nameToString(name: Name): string {
    return `${name.title}${name.title && '. '}${name.first + ' '}${name.last}`;
}

export interface Location {
    country: string,
    city: string, 
    streetName: string, 
    streetNumber: string
}

export function locationToString(location: Location): string {
    return `${location.country}${location.country && ', '}${location.city}${location.city && ', '}${location.streetName}${location.streetName && ' '}${location.streetNumber}`;
}