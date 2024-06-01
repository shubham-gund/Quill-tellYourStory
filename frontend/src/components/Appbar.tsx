import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';
import SearchBar from './SearchBar';
import axios from 'axios';
import { searchQueryState } from "../atoms";
import { BACKEND_URL } from '../config';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";

interface AppbarProps {
  name: string;
  onToggleBlogs?: (showAll: boolean) => void; // New prop to handle the toggle
}

export const Appbar = ({ name, onToggleBlogs }: AppbarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    onToggleBlogs && onToggleBlogs(showAll); // Check if onToggleBlogs is defined
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/signin"); // Redirect to login page after logout
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 bg-slate-950 border-b-2 border-slate-800 text-white fixed w-full top-0">
      <div className=''>
        <Link to={"/blogs"} ><h1 className="text-xl font-bold cursor-pointer" onClick={() => handleToggle(true)}>TaleTrail</h1></Link>
        <span className="text-sm">Welcome, {name}</span>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer">
            <Avatar size={"big"} name={name} />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-100 font-semibold text-black rounded-md shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Edit Profile</Link>
              <Link to="/blogs" className="block px-4 py-2 hover:bg-gray-200" onClick={() =>{ 
                setDropdownOpen(!dropdownOpen);
                handleToggle(false)
              }
              }>Stories</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
