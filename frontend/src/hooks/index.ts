// useBlogs.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilValue } from 'recoil';
import { searchQueryState } from '../atoms';

export interface BlogStructure {
  "content": string;
  "title": string;
  "id": string
  "author": {
      "name": string
  }
  "createdOn":string
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogStructure>();
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
  const [blogs, setBlogs] = useState<BlogStructure[]>([]);
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


export const usePersonalBlogs = () => {
  const searchQuery = useRecoilValue(searchQueryState);
  const [personalBlogloading, setPersonalBlogLoading] = useState(true);
  const [personalBlogs, setPersonalBlogs] = useState<BlogStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authorization token found");
      setPersonalBlogLoading(false);
      return;
    }
    const endpoint = searchQuery ? `/api/v1/blog/search?query=${searchQuery}` : '/api/v1/blog/myblogs';

    axios
      .get(`${BACKEND_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setPersonalBlogs(res.data.blogs);
        setPersonalBlogLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : err.message);
        setPersonalBlogLoading(false);
      });
  }, [searchQuery]);

  return {
    personalBlogloading,
    personalBlogs,
    error,
  };
};
