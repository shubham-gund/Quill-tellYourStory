import { useState, ChangeEvent } from "react";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div className="">
      <Appbar name={localStorage.getItem("name") || "Anonymous"}/>
      <div className="pt-20">
        <h1 className="text-center font-bold text-4xl italic">Publish Your Blog !!</h1>
      </div>
      <div className="flex justify-center pt-6">
        <div className="max-w-screen-md w-full pb-6">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="default-input"
            placeholder="Enter your Title here..."
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <Textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div className="flex justify-center px-8">
        <button
          onClick={async () => {
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
          }}
          type="submit"
          className="w-1/5 py-1.5 px-4 text-lg font-medium text-center text-white bg-blue-700 rounded-3xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
};

function Textarea({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-md w-full">
        <form>
          <div className="w-full mb-4 rounded-lg bg-gray-50">
            <div className="">
              <textarea
                onChange={onChange}
                id="comment"
                rows={10}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Write your Content here.."
                required
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
