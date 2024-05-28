// src/searchState.ts
import { atom } from 'recoil';
import { BlogStructure } from "./hooks" // Assuming you have a Blog type defined

export const searchedBlogsState = atom<BlogStructure[]>({
  key: 'searchedBlogsState',
  default: [],
});
