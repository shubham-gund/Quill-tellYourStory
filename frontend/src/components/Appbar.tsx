// Appbar.tsx
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
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

  return (
    <div className="border-b flex justify-between px-10 py-4 fixed top-0 left-0 w-full bg-white z-50">
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
        <Avatar size={"big"} name={name} />
      </div>
    </div>
  );
};
