import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = ()=>{
  return (
    <div className="min-h-screen flex bg-slate-200 flex-col sm:flex-row">
      <div className="sm:w-1/2 min-h-screen hidden sm:block">
        <Quote/>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center p-4">
        <Auth type="signin" />
      </div>
    </div>
  );
}
