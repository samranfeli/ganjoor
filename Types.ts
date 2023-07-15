export interface Poem {
    id: number;
    title?: string;
    urlSlug?: string;
    excerpt?: string;
    mainSections?: unknown

}
export type Mesra = {
    text?: string;
    id: number;
    versePosition: 0 | 1 | 2 | 3 | 4 | 5 | -1;
    coupletSummary?: string;
}
export type Verse = {
    coupletIndex: number;
    vOrder: number;
    verses: Mesra[];
};

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
export interface Recitation {
    id: number;
    poemId: number;
    poemFullTitle?: string;
    poemFullUrl?: string;
    audioTitle?: string;
    audioArtist?: string;
    audioArtistUrl?: string;
    audioSrc?: string;
    audioSrcUrl?: string;
    legacyAudioGuid?: string;
    mp3FileCheckSum?: string;
    mp3SizeInBytes: number;
    publishDate: string;
    fileLastUpdated: string;
    mp3Url?: string;
    xmlText?: string;
    plainText?: string;
    htmlText?: string;
    mistakes?: {
        mistake?: string;
        numberOfLinesAffected: number;
        coupletIndex: number;
    }[];
    audioOrder: number;
    upVotedByUser: boolean;
}
export interface Comment {
    id:number;
    authorName?:string;
    authorUrl?:string;
    commentDate:string;
    htmlComment?:string;
    publishStatus?:string;
    inReplyToId?:number;
    userId?:string;
    replies:Comment[];
    myComment:boolean;
    coupletIndex:number;
    coupletSummary?:string;
    isBookmarked: boolean;
}
export interface Song{
    id: number;
    poemId: number;
    trackType: 0|1|2|3|-1;
    artistName?:string;
    artistUrl?:string;
    albumName?:string;
    albumUrl?:string;
    trackName?:string;
    trackUrl?:string;
    description?:string;
    brokenLink:boolean;
    golhaTrackId:number;
    approved: boolean;
    rejected: boolean;
    rejectionCause?:string;
    suggestedById?:string;
    suggestedByNickName?:string;
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
        recitations: Recitation[];
        images: unknown;
        songs: Song[];
        sections: {
            id: number;
            poemId: number;
            verseType: number;
            ganjoorMetreId: number;
            ganjoorMetre: {
                id: number;
                urlSlug?: string;
                rhythm?: string;
                verseCount: number;
            };
            poemFormat: number;
        }[];
        geoDateTags: unknown;
        sectionIndex?: number;
        comments:Comment[];
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

export interface SearchItemType {
    id: number;
    fullTitle?: string;
    fullUrl?: string;
    title?: string;
    plainText?: string;
    htmlText?: string;
    category: {
        poet: {
            imageUrl?: string;
            name?:string;
            nickname?:string;
        };
    };
}

export interface UserData {
    sessionId:string;
    token?: string;
    user: {
        id?: string;
        username?: string;
        email?: string;
        phoneNumber?: string;
        firstName?: string;
        sureName?: string;
        status: 0| 1;
        rImageId?: string;
        nickName?: string;
        bio?: string;
        website?: string;
        emailConfirmed: boolean;
    };
    securableItem:{
        shortName?:string;
        description?:string;
        operations:unknown[];
    }[]
}