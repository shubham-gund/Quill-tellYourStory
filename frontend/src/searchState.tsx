// src/searchState.ts
import { atom } from 'recoil';
import { Blog } from "./hooks" // Assuming you have a Blog type defined

export const searchedBlogsState = atom<Blog[]>({
  key: 'searchedBlogsState',
  default: [],
});
