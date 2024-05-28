import { BlogPost } from "../components/BlogPost";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";


export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  if (loading) {
    return <div>loading...</div>;
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return <BlogPost blog={blog} />;
};
