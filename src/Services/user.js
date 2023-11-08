import toast from "react-hot-toast"
import { api } from "../axios"
import { regex } from "../Constants/api"
import axios from "axios"

export const validateUserRegister = async (userData) => {
    try{
        if(!regex.nameRegex.test(userData.name)){
            toast.error("Invalid Name")
        }else if(!regex.usernameRegex.test(userData.username)){
            toast.error("Invalid Username")
        }else if(!regex.emailRegex.test(userData.email)){
            toast.error("Invalid Email")
        }else if(!regex.password.test(userData.password)){
            toast.error("Invalid Password")
        }else if(userData.password !== userData.confirm){
            toast.error("Password does not match!")
        }else{
            userData.is_google = false
            const {data} = await api.post(`/register`, {userData})
            if(data.statusCode == 500){
                toast.error(data.message)
            }else if(data.statusCode==401){
                toast.error(data.message)
            }else if(data.statusCode == 409){
                toast.error(data.message)
            }else if(data.statusCode == 200){
                toast.success(data.message)
                return data.userData
            }
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const loginUser = async (userData) => {
    try{
        if(!regex.emailRegex.test(userData.email)){
            toast.error("Invalid Email")
        }else if(!regex.password.test(userData.password)){
            toast.error("Invalid password")
        }else{
            const {data} = await api.post(`/user-login`, {userData})
            if(data.statusCode == 500){
                toast.error(data.message)
            }else if(data.statusCode == 401){
                toast.error(data.message)
            }else if(data.statusCode == 404){
                toast.error(data.message)
            }else if(data.statusCode == 409){
                toast.error(data.message)
            }else if(data.statusCode == 200){
                toast.success(data.message)
                return data.userData
            }
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const googleSignUp = async (userData, response) => {
    try{
        userData.name = response.name
        const username = response.email.split("@")[0].slice(0,16)
        userData.username = username
        userData.email = response.email
        userData.password = null
        userData.confirm = null
        userData.picture = response.picture
        userData.is_google = false
        const {data} = await api.post(`/register`, {userData})
        if(data.statusCode == 500){
            toast.error(data.message)
        }else if(data.statusCode==401){
            toast.error(data.message)
        }else if(data.statusCode == 409){
            toast.error(data.message)
        }else if(data.statusCode == 200){
            toast.success(data.message)
            return data.userData
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const googleSignIn = async (userData, response) => {
    try{
        userData.email = response.email
        userData.password = null
        const {data} = await api.post(`/google-login`, {userData})
        if(data.statusCode == 500){
            toast.error(data.message)
        }else if(data.statusCode==401){
            toast.error(data.message)
        }else if(data.statusCode == 404){
            toast.error(data.message)
        }else if(data.statusCode == 409){
            toast.error(data.message)
        }else if(data.statusCode == 200){
            toast.success(data.message)
            return data.userData
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const getUserById = async (id) => {
    try{
        const {data} = await api.get(`/get-user-by-id/${id}`)
        console.log(data);
        if(data.statusCode==404){
            toast.error(data.message)
        }else if(data.statusCode==401){
            toast.error(data.message)
        }else if(data.statusCode==200){
            return data.message
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const isAuthenticated = () => {
    const user = localStorage.getItem("userToken")
    return user ? user : false
}

export const getGoogleProfile = async (token_type, token) => {
    const {data} = await axios.get(import.meta.env.VITE_GOOGLE_USER_INFO, {headers: { Authorization: `${token_type} ${token}` }})
    return data
}