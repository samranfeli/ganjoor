export interface Poem {
    id: number;
    title?: string;
    urlSlug?: string;
    excerpt?: string;
    mainSections?: unknown

}

export interface Poet {
    id: number;
    name?: string;
    description?: string;
    fullUrl?: string;
    rootCatId: number;
    nickname?: string;
    published: boolean;
    imageUrl?: string;
    birthYearInLHijri: number;
    validBirthDate: boolean;
    deathYearInLHijri: number;
    validDeathDate: boolean;
    pinOrder: number;
    birthPlace?: string;
    deathPlace?: string;
    birthPlaceLatitude: number;
    birthPlaceLongitude: number;
    deathPlaceLatitude: number;
    deathPlaceLongitude: number;
}

export interface Cat {
    id: number;
    title?: string;
    urlSlug?: string;
    fullUrl?: string;
    tableOfContentsStyle: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    catType: 0 | 1 | 2;
    description?: string;
    descriptionHtml?: string;
    mixedModeOrder: number;
    published: boolean;
    bookName?: string;
    rImageId?: string;
    sumUpSubsGeoLocations: boolean;
    mapName?: string;
    children?: {
        fullUrl: string;
        id: number;
        title: string;
    }[];
    poems?: Poem[]
}

export interface GetPageByUrlResponse {
    id: number;
    ganjoorPageType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    title?: string;
    fullTitle?: string;
    urlSlug?: string;
    fullUrl?: string;
    htmlText?: string;
    noIndex: boolean;
    redirectFromFullUrl?: string;
    poetOrCat: {
        poet: Poet;
        cat: Cat;
    };
    poem: {
        id: number;
        title?: string;
        fullTitle?: string;
        urlSlug?: string;
        fullUrl?: string;
        plainText?: string;
        htmlText?: string;
        sourceName?: string;
        sourceUrlSlug?: string;
        oldTag?: string;
        oldTagPageUrl?: string;
        mixedModeOrder: number;
        published: boolean;
        language?: string;
        poemSummary?: string;
        category: {
            poet: Poet;
            cat: Cat;
        };
        next: Poem;
        previous: Poem;
        verses: {
            id: number;
            vOrder: number;
            coupletIndex?: number;
            versePosition: 0 | 1 | 2 | 3 | 4 | 5 | -1;
            sectionIndex1?: number;
            sectionIndex2?: number;
            sectionIndex3?: number;
            sectionIndex4?: number;
            text?: string;
            languageId?: number;
            coupletSummary?: string;
        }[];
        recitations: unknown;
        images: unknown;
        songs: unknown;
        sections: unknown;
        geoDateTags: unknown;
        sectionIndex?: number;
    };
    secondPoet: unknown;
    next: {
        id: number;
        title?: string;
        fullUrl?: string;
    };
    previous: {
        id: number;
        title?: string;
        fullUrl?: string;
    };
}