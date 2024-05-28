import { Link } from "react-router-dom"
interface BlogCardProps {
  id:string,
  authorName:string,
  title:string,
  content:string,
  createdOn :string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  createdOn
}:BlogCardProps)=>{
  return (<Link to={`/blog/${id}`}>
      <div className="border-b border-slate-300 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex ">
          <div className="">
            <Avatar name={authorName}/>
          </div>
          <div className="font-light px-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col px-1">
            <div className="h-1 w-1 rounded-full bg-slate-500">
            </div>
          </div>
          <div className="px-2 font-thin text-slate-500 text-sm flex justify-center flex-col"> 
            {createdOn}
          </div>
        </div>
        <div className="text-xl font-bold pt-2">
          {title}
        </div>
        <div className="font-medium text-slate-500"> 
          {content.length>150 ? content.slice(0,150)+"..." : content}
        </div>
        <div className="text-sm text-slate-400 pt-4">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
        <div bg-slate-300 h-1 w-full>

        </div>
      </div>
    </Link>)
}

export function Avatar({name , size="small"}:{name:string , size?:"small" | "big"} ){
  return (
    <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-8 h-8" } overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
      <span className={`${size === "small" ?  "text-sm" : "text-lg" } font-medium text-gray-700 dark:text-gray-300`}>{name[0].toUpperCase()}</span>

  </div>
  )
}