import { Link } from "react-router-dom";
import { LampDemo } from "../components/ui/lamp";


export const Landing = ()=>{

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex justify-center items-center fixed top-0 left-0 right-0 w-full sm:size-full size-96">
      <LampDemo />
      </div>

      <div className="flex justify-center items-center sm:space-x-4 space-x-12 absolute inset-x-0 bottom-16 ">
        <Link to={"/signup"} className="flex items-center justify-center sm:w-40 w-32 h-10 rounded-full  hover:bg-cyan-500 bg-white border dark:border-white border-transparent text-black text-center text-sm font-semibold">
          Join Now
        </Link>
        <Link to={"/signin"} className="flex items-center justify-center sm:w-40 w-32 h-10 rounded-full hover:bg-cyan-500 bg-blue-600 border dark:border-white border-transparent text-black text-center text-sm font-semibold">
          Login
        </Link>
      </div>
    </div>
  );  
}