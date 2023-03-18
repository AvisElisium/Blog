import {Author} from "./author"

export interface Article {
    id: string;
    headline: string;
    content: string;
    createdAt: string;
    author: Author;
}