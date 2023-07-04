
export function request<TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(url, config)
        .then((response) => response.json())
        .then((data) => data as TResponse);
}


export function getPoemFormat(formatId:number) {
    switch (formatId){
        case 1:
            return 'غزل';
        case 2:
            return 'قصیده';
        case 3:
            return 'مثنوی';
        case 4:
            return 'قطعه';
        case 5:
            return 'رباعی';
        case 7:
            return 'غزل/قصیده/قطعه';
        case 8:
            return 'ترکیب بند';
        case 16:
            return 'ترجیع بند';        
        case 992:
            return 'مسمط';

        default:
            return '';
    }
}