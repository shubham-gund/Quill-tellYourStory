import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';
import SearchBar from './SearchBar';
import axios from 'axios';
import { searchQueryState } from "../atoms";
import { BACKEND_URL } from '../config';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { MdCreate } from 'react-icons/md';



export const Appbar = ({ name } :{name:string}) => {
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

  const handleLogout = () => {
    localStorage.clear()
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-10 bg-slate-950 border-b-2 border-slate-800 text-white fixed w-full top-0">
      <div className=''>
        <Link to={"/blogs"} className='flex' >
          <h1 className="sm:pb-1 text-xl sm:text-3xl font-bold cursor-pointer">Quill</h1>
          <div className='flex items-center pl-2 text-xl sm:text-2xl'>
            <MdCreate className='text-blue-400'/>
          </div>
        </Link>
      </div>
      <SearchBar
        value={searchQuery} 
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />
      <div className="flex items-center space-x-2 sm:space-x-4 relative ml-4 sm:ml-0">
        <div className="flex block hidden sm:block">  {/* Show "Create" button on larger screens */}
          <Link to={"/publish"}>
            <button type="button" className="h-9 flex jutify-center items-center text-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 text-center ">Create</button>
          </Link>
        </div>

        <div className="">
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer">
            <Avatar size={"big"} name={name} />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-100 font-semibold text-black rounded-md shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Edit Profile</Link>
              <Link to="/stories" className="block px-4 py-2 hover:bg-gray-200" onClick={() =>{ 
                setDropdownOpen(!dropdownOpen);
              }
              }>Stories</Link>
              
 {/* Show "+" button on phone screens */}
          <Link to={"/publish"} className="sm:hidden block px-4 py-2 hover:bg-gray-200">
              <div className='flex items-center'>
                Create 
              </div>
          </Link>


              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
