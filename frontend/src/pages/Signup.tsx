import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <div className="sm:w-1/2 hidden sm:block">
        <Quote/>
      </div>
      <div className="flex flex-col justify-center lg:w-1/2 px-8  sm:p-8 bg-slate-200">
        <div className="max-w-md mx-auto">
          <Auth type="signup" />
        </div>
      </div>
    </div>
  );
};
