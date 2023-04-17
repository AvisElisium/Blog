import {Author} from "./author"
import {Tag} from "../../components/authorpanel/CreateArticleForm";

export interface Article {
    id: string;
    headline: string;
    content: string;
    createdAt: string;
    author: Author;
    image: string | null;
    isFeatured: boolean;
    tags: Tag[];
}