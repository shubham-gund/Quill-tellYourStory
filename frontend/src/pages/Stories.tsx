import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { usePersonalBlogs } from "../hooks"

export const Stories = ()=>{
  const {personalBlogs,personalBlogloading} = usePersonalBlogs();

  if (personalBlogloading ) {
    return (
      <div>
        <Appbar name={localStorage.getItem("name") || "Anonymous"} />
        <div className="pt-24 flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar name={localStorage.getItem("name") || "Anonymous"} />

      <div className="pt-20 flex justify-center">
          <div>
            {personalBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author ? blog.author.name || "Anonymous" : "Anonymous"} // Check if author exists
                title={blog.title}
                content={blog.content}
                createdOn={blog.createdOn}
                isPersonal={true} // Indicate this is not a personal blog
              />
            ))}
          </div>
      </div>
    </div>
  );
}