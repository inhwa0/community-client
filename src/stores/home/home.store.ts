import axios from 'axios';
import {
  atom, selector, selectorFamily, useSetRecoilState,
} from 'recoil';
import { Content } from './home.model';

export const postsState = atom<Content[]>({
  key: '@pages/home/posts-state',
  default: [],
});

export const currentCursorInternalState = atom<number>({
  key: '@pages/home/current-cursor-Internal-state',
  default: 1,
});
export const lastFetchPageState = atom<number>({
  key: '@pages/home/last-fetch-page-state',
  default: 0,
});

export const lastScrollYState = atom<number>({
  key: '@pages/home/last-scroll-y-state',
  default: 0,
});

export const fetchPosts = async (page: number): Promise<Content[]> => {
  try {
    const response = await axios.get(`http://52.78.54.195:3000/contents/list/${page}`);
    return response.data?.content;
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const postsSelector = selectorFamily({
  key: '@pages/home/posts',
  get: (page: number) => async ({ get }) => {
    return fetchPosts(page);
  },
});
