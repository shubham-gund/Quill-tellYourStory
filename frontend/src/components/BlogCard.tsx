import { Link } from "react-router-dom";
import { MdCreate, MdDelete } from "react-icons/md";
import axios from "axios";
import { useCallback } from "react";
import { BACKEND_URL } from "../config";
export interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  createdOn: string;
  isPersonal: boolean; // Added isPersonal prop
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  createdOn,
  isPersonal, // Destructure isPersonal prop
}: BlogCardProps) => {
  const handleEdit = () => {
    // Handle edit logic here
  };
  const handleDelete = useCallback(async () => { // Fix useCallback usage
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      ); // Use id for deletion
      console.log(response)
      if (response.data && !response.data.error) {
        // Handle success
        window.location.reload()
      }
    } catch (error) {
        console.log("An Unexpected error occurred");
    }
  }, [id]);

  return (
    <div className="flex border-b border-slate-300 p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex-grow">
        <Link to={`/blog/${id}`}>
          <div className="flex">
            <div className="">
              <Avatar name={authorName} />
            </div>
            <div className="px-2 text-sm flex justify-center flex-col">
              {authorName}
            </div>
            <div className="flex justify-center flex-col px-1">
              <div className="h-1 w-1 rounded-full bg-slate-500"></div>
            </div>
            <div className="px-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
              {createdOn}
            </div>
          </div>
          <div className="text-xl font-bold pt-2">{title}</div>
          <div className="font-medium text-slate-500">
            {content.length > 150 ? content.slice(0, 150) + "..." : content}
          </div>
          <div className="text-sm text-slate-400 pt-4">
            {`${Math.ceil(content.length / 100)} min read`}
          </div>
        </Link>
      </div>
      {isPersonal && (
        <div className="flex justify-center pl-4">
          <button className="flex justify-center items-center h-10 w-10 p-2 rounded-full hover:bg-green-100" onClick={handleEdit}>
            <MdCreate className="text-green-600" size={20} />
          </button>
          <button className="flex justify-center items-center h-10 w-10 p-2 rounded-full hover:bg-red-100" onClick={() => { 
            handleDelete();  
          }}>
            <MdDelete className="text-red-500" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div className={`inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-700 rounded-full dark:bg-gray-600`}>
      <span className={`${size === "small" ? "text-sm" : "text-lg"} font-medium dark:text-gray-300`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
