import { BlogPost } from "../components/BlogPost";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { BlogCardProps as BlogType } from "../components/BlogCard";

export const Blog = ()=>{
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: id || ""
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return <>
    <BlogPost blog={blog as BlogType}></BlogPost>
  </>
}