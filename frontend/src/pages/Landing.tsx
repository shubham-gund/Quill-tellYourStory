import { Link } from "react-router-dom";
import { LampDemo } from "../components/ui/lamp";


export const Landing = ()=>{

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <LampDemo/>
      <div className="flex space-x-6">
        <Link to={"/signup"} className="flex items-center justify-center w-40 h-10 rounded-full  hover:bg-slate-500 bg-slate-400 border dark:border-white border-transparent text-black text-center text-sm font-semibold">
          Join Now
        </Link>
        <Link to={"/signin"} className="flex items-center justify-center w-40 h-10 rounded-full hover:bg-slate-500 bg-slate-400 border dark:border-white border-transparent text-black text-center text-sm font-semibold">
          Login
        </Link>
      </div>
    </div>
  );  
}