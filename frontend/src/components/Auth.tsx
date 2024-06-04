import { ChangeEvent, useState } from "react";
import { Link ,useNavigate} from "react-router-dom"
import { SignupInput } from "@shubham_gund_02/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup" | "signin"})=>{
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  })
  const [error,setError] = useState("");

  async function sendRequest (e:any){

    e.preventDefault();
        if (!postInputs.email) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!postInputs.password) {
            setError("Please enter valid password");
            return
        }
        setError("");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
      if(!response){
        setError("Invalid Crednetials..")
      }
      const jwt = response.data.jwt;
      localStorage.setItem("token",jwt);
      localStorage.setItem("name",response.data.name)
      navigate("/blogs");
    } catch (error) {
        setError("Invalid Crednetials..")
    }
  }
  return <div className="h-screen flex justify-center items-center bg-slate-200 text-black">
    <div>
      <div className="text-4xl text-center font-extrabold pb-2">
        {type === "signin" ?  "Login to Account " : "Create an Account"}
      </div>
      <div className=" text-slate-500 mb-6 px-10 text-center">
        {type === "signin" ?  "Don't have an Acocount ?" : "Already have an Account ?"}

        <Link to={type==="signin" ? "/signup" : "/signin"} className="px-2 font-semibold underline">{type === "signup" ? "Login" : "Sign-Up"}</Link>

      </div>

      {type === "signup" ? <LabelledInput label="Name" placeholder="Enter Your Name " onChange={(e)=>{
        setPostInputs({
          ...postInputs,
          name:e.target.value
        })
      }}/> : null}
      <LabelledInput label="Email" type={"email"} placeholder="xyz@gmail.com " onChange={(e)=>{
        setPostInputs({
          ...postInputs,
          email:e.target.value
        })
      }}/>
      <LabelledInput label="Password" type={"password"} placeholder="min 6 character " onChange={(e)=>{
        setPostInputs({
          ...postInputs,
          password:e.target.value
        })
      }}/>

    {error && <p className='text-red-500 text-xs pt-1'>{error}</p>}
      <button onClick={sendRequest} type="button" className="w-full text-white bg-slate-800 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2 mt-10 mb-2 ">{type === "signin" ? "Login": "Sign-Up"}</button>
    </div>

  </div>
}

interface LabelledInputType {
  label:string,
  placeholder:string,
  onChange:(e:ChangeEvent<HTMLInputElement>)=> void;
  type?:string
}

function LabelledInput({ label, placeholder, onChange, type }:LabelledInputType){
  return <div>
              <div className="mt-4">
            <label className="block mb-2 text-base font-bold text-gray-900 dark:text-white">{label}</label>
            <div className="border-slate-400 border-b-2">
             <input onChange={onChange} type={ type || "text"} className="bg-slate-200 text-gray-900 text-sm font-bold rounded-lg block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
  </div>
}