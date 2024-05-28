import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Appbar name={localStorage.getItem("name") || "Anonymous"} />
      <div className="pt-4 flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author ? blog.author.name || "Anonymous" : "Anonymous"} // Check if author exists
              title={blog.title}
              content={blog.content}
              createdOn={blog.createdOn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
