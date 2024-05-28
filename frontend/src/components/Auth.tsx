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

  async function sendRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
      console.log(response.data)
      const jwt = response.data.jwt;
      localStorage.setItem("token",jwt);
      localStorage.setItem("name",response.data.name)
      navigate("/blogs");
    } catch (error) {
      alert("Request failed")
    }
  }
  return <div className="h-screen flex justify-center items-center">
    <div>
      <div className="text-4xl text-center font-extrabold pb-2 px-10">
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
      <LabelledInput label="Password" type={"password"} placeholder="password " onChange={(e)=>{
        setPostInputs({
          ...postInputs,
          password:e.target.value
        })
      }}/>
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
            <label className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={ type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
  </div>
}