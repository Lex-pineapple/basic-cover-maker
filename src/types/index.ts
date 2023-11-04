export interface Callback<T> {
    (d?: T): void;
}

export type objectType = {
    [key: string]: string | number;
};

export type objectStringType = {
    [key: string]: string;
};

export interface optionsInterface {
    apiKey: string;
    q: string;
    searchIn: string;
    sources: string;
    domains: string;
    excludeDomains: string;
    from: string;
    to: string;
    language: string;
    sortBy: string;
    pageSize: number;
    page: number;
}

export enum ResponseCodes {
    Unauthorized = 401,
    NotFound = 404,
}

export interface dataInterface {
    status: string;
    totalResults?: number;
    sources: objectType[];
    articles?: articleInterface[];
}

export type dataSources = Pick<dataInterface, 'status' | 'totalResults' | 'sources'>;

export interface articleInterface {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export abstract class loaderAbstract {
    private baseLink: string;
    private options: Partial<optionsInterface>;

    constructor(baseLink: string, options: Partial<optionsInterface>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getOptions(): objectType {
        return this.options;
    }

    getBaseLink(): string {
        return this.baseLink;
    }

    abstract getResp<T>({ endpoint, options }: { endpoint: string; options?: objectType }, callback: Callback<T>): void;

    abstract errorHandler(res: Response): Response;

    abstract makeUrl(options: objectType, endpoint: string): string;

    abstract load<T>(method: string, endpoint: string, callback: Callback<T>, options: objectType): void;
}

export interface AppControllerInterface {
    getSources<T>(callback: Callback<T>): void;
    getNews<T>(e: Event, callback: Callback<T>): void;
}

export interface AppInterface {
    controller: AppControllerInterface;
    view: AppViewInterface;
    start(): void;
}

export abstract class AppAbstract implements AppInterface {
    abstract controller: AppControllerInterface;
    abstract view: AppViewInterface;
    abstract start(): void;
}

export interface AppViewInterface {
    news: NewsInterface;
    sources: SourcesInterface;
    drawNews(data: dataInterface): void;
    drawSources(data: dataInterface): void;
}

export abstract class AppViewAbstract implements AppViewInterface {
    abstract news: NewsInterface;
    abstract sources: SourcesInterface;
    abstract drawNews(data: dataInterface): void;
    abstract drawSources(data: dataInterface): void;
}

export interface NewsInterface {
    draw(data: articleInterface[]): void;
}

export interface SourcesInterface {
    draw(data: objectType[]): void;
}

export interface AlphabetInterface {
    scrollToLetter(e: Event): void;
}
