import { MdClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom"; 

type BlogDataProps = {
  title: string,
  content: string
} | null;

export const Publish = ({ BlogData, onClose }: { BlogData: BlogDataProps, onClose: () => void }) => {
  const [title, setTitle] = useState(BlogData?.title || "");
  const [content, setContent] = useState(BlogData?.content || "");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const addNewBlog = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${res.data.id}`);
      if (res.data && res.data.Blog) {
        onClose();
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddBlog = () => {
    if (!title) {
      setError("Please Enter Title");
      return;
    }
    if (!content) {
      setError("Please Enter Content");
      return;
    }
    setError("");
    addNewBlog();
  };

  return (
    <div className="relative w-11/12 sm:w-5/12 mx-5 sm:mx-20 mt-20 sm:mt-20 bg-slate-500 p-5 rounded-lg">
      <button className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-400" onClick={onClose}>
        <MdClose className="text-xl" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label pt-4 px-10 font-bold">TITLE</label>
        <input
          type="text"
          className="text-xl px-7 py-3 mx-4 bg-slate-500 outline-none border border-black rounded-xl"
          placeholder=""
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="pt-4 px-10 font-bold">CONTENT</label>
        <textarea
          className="text-sm bg-slate-500 px-7 py-3 mx-4 border border-black rounded-xl outline-none"
          placeholder=""
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4 mx-5">{error}</p>}

      <div className="flex items-center justify-center">
        {/* <button className=" font-medium m-7 pt-3 w-80" onClick={handleAddBlog}>
          Publish
        </button> */}
         <button type="button" className="text-white w-2/5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 my-8 mb-2" onClick={handleAddBlog}>Publish</button>
      </div>
    </div>
  );
};
