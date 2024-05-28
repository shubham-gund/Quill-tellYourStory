// Appbar.tsx
import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useSetRecoilState } from 'recoil';
import { searchQueryState } from "../atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Appbar = ({ name }: { name: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const setGlobalSearchQuery = useSetRecoilState(searchQueryState);

  async function handleSearch() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/search`, {
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

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <div className="font-bold text-xl cursor-pointer">
          Blogger
        </div>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />

      <div className="">
        <Link to={"/publish"}>
          <button type="button" className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Create
          </button>
        </Link>
        <Avatar size={"big"} name={name} />
      </div>
    </div>
  )
}
