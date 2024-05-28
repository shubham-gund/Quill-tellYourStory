// useBlogs.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilValue } from 'recoil';
import { searchQueryState } from '../atoms';
import { BlogCardProps } from '../components/BlogCard';

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogCardProps>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authorization token found");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setBlog(res.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    error
  };
}

export const useBlogs = () => {
  const searchQuery = useRecoilValue(searchQueryState);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authorization token found");
      setLoading(false);
      return;
    }

    const endpoint = searchQuery ? `/api/v1/blog/search?query=${searchQuery}` : '/api/v1/blog/bulk';

    axios
      .get(`${BACKEND_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      });
  }, [searchQuery]);

  return {
    loading,
    blogs,
    error,
  };
};
