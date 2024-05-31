import { ChangeEventHandler } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"

const SearchBar=({value ,onChange,handleSearch }:{value:string,onChange:ChangeEventHandler<HTMLInputElement>, 
handleSearch:()=>void
})=>{
    return (
        <div className="w-28 h-8 sm:w-80 sm:h-10 flex items-center px-4 bg-slate-800 rounded-full">
            <input 
                type="text"
                placeholder="Search"
                className=" text-xs sm:text-lg w-full font-semibold text-base bg-transparent py-{12px} outline-none"
                value={value}
                onChange={onChange}    
            />

            <FaMagnifyingGlass 
                className="text-slate-400 cursor-pointer hover:text-white"
                onClick={handleSearch}
            ></FaMagnifyingGlass>
        </div>
    )
}

export default SearchBar