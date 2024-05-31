// Appbar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';
import SearchBar from './SearchBar';
import axios from 'axios';
import { searchQueryState } from "../atoms";
import { BACKEND_URL } from '../config';
import { useSetRecoilState } from 'recoil';
interface AppbarProps {
  name: string;
  onToggleBlogs: (showAll: boolean) => void; // New prop to handle the toggle
}

export const Appbar = ({ name, onToggleBlogs }: AppbarProps) => {
  const [allBlogs, setAllBlogs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const setGlobalSearchQuery = useSetRecoilState(searchQueryState);

  async function handleSearch() {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/blog/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          query: searchQuery,
        },
      });
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  useEffect(() => {
    setGlobalSearchQuery(searchQuery);
  }, [searchQuery, setGlobalSearchQuery]);

  const handleToggle = (showAll: boolean) => {
    setAllBlogs(showAll);
    onToggleBlogs(showAll);
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 bg-slate-950 border-b-2 border-slate-800 text-white fixed w-full top-0">
      <div className='pr-20'>
        <Link to={"/blogs"} ><h1 className="text-xl font-bold cursor-pointer">Medium</h1></Link>
        <span className="text-sm">Welcome, {name}</span>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />
      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-1 rounded-full ${allBlogs ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => handleToggle(true)}
        >
          Feed
        </button>
        <button
          className={`px-4 py-1 rounded-full ${!allBlogs ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => handleToggle(false)}
        >
          Your Blogs
        </button>

        <Avatar size={"big"} name={name} />
      </div>
    </div>
  );
};
