import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { getGoogleProfile, googleSignIn, loginUser } from "../../../Services/user"
import toast from "react-hot-toast"
import { updateUser } from "../../../Redux/UserSlice/user"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({email:"", password:""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        for(let key in userData){
            if(!userData[key]){
                toast.error(key.replace(key[0], key[0].toUpperCase())+" is empty!")
                return
            }
        }
        const response = await loginUser(userData)
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

    const googleLogin = useGoogleLogin({
        onSuccess: async (CredentialResponse) => {
            const response = await getGoogleProfile(CredentialResponse.token_type, CredentialResponse.access_token)
            const result = await googleSignIn(userData, response)
            if(result){
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
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Login Now</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" className=" outline-none p-2 w-full" value={userData.email} name="email" onChange={(e)=>setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-key"></i>
                        <input type="password" placeholder="Password" className=" outline-none p-2 w-full" value={userData.password} name="password" onChange={(e)=>setUserData({...userData, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1 px-2" type="submit">Login</button>
                        <button className="bg-white shadow flex items-center justify-center shadow-gray-500 rounded-xl px-2 mt-3" type="button" onClick={googleLogin}><img src="./google.png" className="w-12"/> Login with google</button>
                        <p className="mt-3 text-sm">Don't have an account? <span onClick={()=>navigate("/register")} className="text-blue-900 cursor-pointer">Create</span></p>
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default Login
