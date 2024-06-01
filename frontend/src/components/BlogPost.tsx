import { Appbar } from "./Appbar"
import { BlogStructure } from "../hooks"
import { Avatar } from "./BlogCard"

export const BlogPost =({blog}:{blog:BlogStructure})=>{

  return <div>
   <Appbar name={localStorage.getItem("name") || "Anonymous"}  />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-10 w-full max-w-screen-xl" >
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              {blog.createdOn}
            </div>
            <div className="pt-4">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4 pt-4">
            <div className="text-slate-600 text-lg font-semibold">
            Author 
            </div>
            <div className="flex pt-4">
              <div className="pr-4 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"}/> 
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"} 
                </div>
                <div className="pt-2 text-slate-500">
                  Catch phrase about the iser
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
}