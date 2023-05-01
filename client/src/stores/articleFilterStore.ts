import { create } from 'zustand';


interface ArticleFilterState {
  pageSize: number;
  pageNumber: number;
  createdBy: string | null;
  tags: string[] | null;
  createdAfter: string | null;
  createdBefore: string | null;
}

export const useArticleFilterStore = create<ArticleFilterState>((set) => ({
  pageSize: 20,
  pageNumber: 1,
  createdBy: null,
  tags: null,
  createdAfter: null,
  createdBefore: null,
}))