import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"
import useAxios from "../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";


const SignUp = () => {
    const [role,setRole] = useState()
    const [error,setError] = useState("")
    const axiosPublic = useAxios()
    const navigate = useNavigate()

    const {mutateAsync} = useMutation({
        mutationKey: ['user'],
        mutationFn: async(user)=>{
            const {data} = await axiosPublic.post("/user",user)
            return data
        },
        onSuccess: ()=> {
            toast.success("You have successfully register please wait for admin approval")
            navigate("/signIn")
        }
    })
   

    const handleSignUp = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const pin = parseInt(form.pin.value)
        if (typeof pin !== "number" || !Number.isInteger(pin) || pin < 10000 || pin > 99999) {
            setError("Please use a 5-digit number")
            return;
        }
        
        const hashedPin = bcrypt.hashSync(pin.toString(),10)
      
        const number = form.number.value
        const user = {
            name,
            email,
          hashedPin,
            number,
            role,
            status: "pending"
        }
       
      mutateAsync(user)
      form.reset()
      
    }
    return (
        <div className="flex  min-h-screen  items-center justify-center">
            <div className="flex flex-row-reverse  w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url(https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80)"}}></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                    </div>

                   

                    <form onSubmit={handleSignUp}>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Name</label>
                        <input id="LoggingEmailAddress" required className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name="name" />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email</label>
                        <input id="LoggingEmailAddress" required className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="email" />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Phone number</label>
                        <input id="LoggingEmailAddress" required className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="number" name="number" />
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Pin</label>
                           
                        </div>

                       {
                        error ?
                      <>
                      
                      <input id="loggingPassword" required className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="pin" />
                      <p className="text-red-500">{error}</p>
                      
                       </>: 
                        <input id="loggingPassword" required className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="pin" />
                       }
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Role</label>
                           
                        </div>

                        <select onChange={(e)=>setRole(e.target.value)} required className="select select-bordered w-full block  px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
                        <option disabled selected>Select a role</option>
                        <option value="user">User</option>
                        <option value="agent">Agent</option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign Up
                        </button>
                        <Toaster />
                    </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link to="/signIn" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign in</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;