import { BlogPost } from "../components/BlogPost";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Blog as BlogType } from "../hooks";

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