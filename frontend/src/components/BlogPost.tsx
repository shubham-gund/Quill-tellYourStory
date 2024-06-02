import { Appbar } from "./Appbar";
import { BlogStructure } from "../hooks";
import { Avatar } from "./BlogCard";

export const BlogPost = ({ blog }: { blog: BlogStructure }) => {
  return (
    <div>
      <Appbar name={localStorage.getItem("name") || "Anonymous"} onToggleBlogs={() => {}} />

      <div className="flex flex-col sm:flex-row justify-center">
        <div className="w-full sm:w-3/4 px-8 sm:pl-32 sm:px-1 sm:pt-8 pt-2 pb-4 sm:pb-0">
          <div className="text-3xl sm:text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-2">{blog.createdOn}</div>
          <div className="w-full sm:w-4/5 pt-4  text-sm sm:text-lg" >{blog.content}</div>
        </div>
        <div className="w-full sm:w-1/4 pt-8 sm:pt-8 pl-0">
          <div className=" px-10 text-slate-600 text-lg font-semibold">Author</div>
          <div className="flex pt-4 px-10 sm:px-1">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
            </div>
            <div>
              <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
              <div className="pt-2 text-slate-500">Catch phrase about the user</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
