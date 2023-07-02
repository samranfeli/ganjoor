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

export interface Cat {
    id: number;
    title:string;
    urlSlug:string;
    fullUrl:string;
    catType: 0;
    description: string;
    descriptionHtml: string;
    published: boolean;
    children:{
        fullUrl:string;
        id:number;
        title:string;
    }[];
    poems:{
        id: number;
        title: string;
        urlSlug: string;
        excerpt: string;
        mainSections: null
    }[]
    
}