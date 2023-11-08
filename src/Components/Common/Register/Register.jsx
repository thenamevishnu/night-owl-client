import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import {useGoogleLogin} from "@react-oauth/google"
import { useState } from "react"
import toast from "react-hot-toast"
import { getGoogleProfile, googleSignUp, validateUserRegister } from "../../../Services/user"
import {useDispatch} from "react-redux"
import { updateUser } from "../../../Redux/UserSlice/user"

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({name:"", username:"", email:"", password:"", confirm: "", type:""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        for(let key in userData){
            if(!userData[key] && key != "is_google"){
                toast.error(`${key.replace(key[0], key[0].toUpperCase())} is empty`)
                return
            }
        }
        const response = await validateUserRegister(userData)
        if(response){
            const {token, ...rest} = response
            dispatch(updateUser(rest))
            localStorage.setItem("userToken", token)
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
        return
    }

    const googleLogin = () => {
        if(!userData.type){
            toast.error("Select account type!")
        }else{
            continueLogin()
        }
        return
    }

    const continueLogin = useGoogleLogin({
        onSuccess: async (CredentialResponse) => {
            const response = await getGoogleProfile(CredentialResponse.token_type, CredentialResponse.access_token)
            const info = {type:userData.type}
            const result = await googleSignUp(info, response)
            if(result) {
                const {token, ...rest} = result
                dispatch(updateUser(rest))
                localStorage.setItem("userToken", token)
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        },
        onError: () => {
            console.log("error")
        }
    })

    return (
        <>
            <Header/>
            <div className="mt-20 flex justify-center font-primary px-2 md:px-10">
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => await handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Register Now</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Name" name="name" className=" outline-none p-2 w-full" value={userData.name} onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="p-1 px-2 rounded-xl mt-3 shadow shadow-black flex items-center">
                        <i className="fa fa-at"></i>
                        <input type="text" placeholder="Username" name="username" className=" outline-none p-2 w-full" value={userData.username} onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" name="email"  className=" outline-none p-2 w-full" value={userData.email} onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="mt-3 rounded-xl relative flex w-full gap-3 text-center items-center">
                        <div className="shadow shadow-black rounded-xl w-1/2 p-2 relative cursor-pointer" onClick={()=>setUserData({...userData, type: "Developer"})}>Developer {userData.type == "Developer" && <i className="fa fa-circle-check text-green-700"></i>}<i className="fa fa-circle-info text-gray-500 text-xs absolute top-1 right-1 cursor-pointer group"><span className="font-primary font-normal absolute rounded-md opacity-0 group-hover:opacity-100 pointer-events-none duration-150 transition-all text-white bg-black bg-opacity-80 whitespace-nowrap p-1 right-2 bottom-5 px-2">Account-Type: Developer</span></i></div>
                        <div className="shadow shadow-black rounded-xl w-1/2 p-2 relative cursor-pointer" onClick={()=>setUserData({...userData, type: "Client"})}>Client {userData.type == "Client" && <i className="fa fa-circle-check text-green-700"></i>}<i className="fa fa-circle-info text-gray-500 text-xs absolute top-1 right-1 cursor-pointer group"><span className="font-primary font-normal absolute rounded-md opacity-0 group-hover:opacity-100 duration-150 pointer-events-none transition-all text-white bg-black bg-opacity-80 whitespace-nowrap p-1 right-2 bottom-5 px-2">Account-Type: Client</span></i></div>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-key"></i>
                        <input type="password" placeholder="Password" name="password" className=" outline-none p-2 w-full" value={userData.password} onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center mt-3">
                        <i className="fa fa-lock"></i>
                        <input type="password" placeholder="Confirm Password" name="confirm" className=" outline-none p-2 w-full" value={userData.confirm} onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">
                        
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1.5 px-2" type="submit">Create Account</button>
                        <button type="button" className="bg-white shadow flex items-center justify-center shadow-gray-500 rounded-xl px-2 mt-3" onClick={googleLogin}><img src="./google.png" className="w-12"/> Signup with google</button>
                       
                        <p className="mt-3 text-sm">Already have an account? <span onClick={()=>navigate("/login")} className="text-blue-900 cursor-pointer">Login</span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
