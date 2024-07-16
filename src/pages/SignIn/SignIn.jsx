import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

import bcrypt from "bcryptjs"
import toast, { Toaster } from "react-hot-toast";


const SignIn = () => {

    const axiosPublic = useAxios()
  
    const navigate = useNavigate()
   

    const handleSignIn = e => {
        e.preventDefault()
        const form = e.target
        const email = form.number.value
        const pin = form.pin.value
      
        try{
          
            axiosPublic.get("/user")
            .then(result=> {
               const dat = result?.data.find(dat => dat.email === email)
               
                bcrypt.compare(pin, dat.hashedPin, (err,isMatch) => {
                    if(err){
                        toast.error(err.message)
                    }else if(!isMatch){
                        toast.error("Please provide valid pin")
                    }else{
                        axiosPublic.post("/jwt",{email: email})
                        .then(result => {
                           console.log(result.data)
                           const token = result.data
                           localStorage.setItem('access_token', token)
                           localStorage.setItem("userEmail",dat?.email)
                           toast.success("You have successfully sign in")
                           
                           navigate("/dashboard")
                        })
                       
                    }
                })
            })
        }
        catch (err){
          console.log(err)
        }
    }
    return (
        <div className="flex  min-h-screen  items-center justify-center">
        <div className="flex   w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url(https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80)"}}></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Welcome back!
                </p>

               <form onSubmit={handleSignIn}>
                  
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Phone number</label>
                    <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="number" />
                </div>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Pin</label>
                       
                    </div>

                    <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="pin" />
                </div>

                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                    <Toaster />
                </div>

               </form>
                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to="/signUp"  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignIn;