
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// types.ts
export interface Blog {
  id: string;
  title: string;
  content: string;
  createdOn: string;
  author: {
    name: string;
  };
}


export const useBlog = ({id}:{id:string})=>{
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
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
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authorization token found");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
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
  }, []);

  return {
    loading,
    blogs,
    error,
  };
};
