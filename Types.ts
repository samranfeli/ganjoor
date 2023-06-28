export interface Poet {
    birthPlace: string;
    birthPlaceLatitude: number;
    birthPlaceLongitude: number;
    birthYearInLHijri: number;
    deathPlace: string;
    deathPlaceLatitude: number;
    deathPlaceLongitude: number;
    deathYearInLHijri: number;
    description?: string;
    fullUrl: string;
    id: number;
    imageUrl: string;
    name: string;
    nickname: string;
    pinOrder: number;
    published: boolean;
    rootCatId: number;
    validBirthDate: boolean;
    validDeathDate: boolean;
}