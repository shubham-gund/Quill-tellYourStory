// src/hooks/useSearchBlogs.js
import { useRecoilState } from 'recoil';
import { searchedBlogsState } from '../searchState';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const useSearchBlogs = (query:string) => {
  const [searchedBlogs, setSearchedBlogs] = useRecoilState(searchedBlogsState);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          query,
        },
      });
      setSearchedBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return { searchedBlogs, handleSearch };
};
