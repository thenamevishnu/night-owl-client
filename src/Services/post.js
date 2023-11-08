import toast from "react-hot-toast"
import { regex } from "../Constants/api"
import { api } from "../axios"

export const validateJobPost = async (postData) => {
    try{
        if(!regex.title.test(postData.title)){
            toast.error("Invalid Title")
        }else if(!regex.description.test(postData.description)){
            toast.error("Invalid Description")
        }else if(isNaN(postData.minPay)){
            toast.error("Min pay should be a numeric")
        }else if(isNaN(postData.maxPay)){
            toast.error("Max pay should be a numeric")
        }else if(postData.minPay >= postData.maxPay){
            toast.error("Min pay should be a less than max pay")
        }else{
            postData.minPay = parseFloat(postData.minPay)
            postData.maxPay = parseFloat(postData.maxPay)
            const {data} = await api.post(`/post-job`, {postData})
            if(data.statusCode == 500){
                toast.error(data.message)
            }else if(data.statusCode==401){
                toast.error(data.message)
            }else if(data.statusCode == 200){
                toast.success(data.message)
                return true
            }
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const getFullJobs = async (filters) => {
    try{
        const {data} = await api.get(`/get-full-jobs/${JSON.stringify(filters)}`)
        if(data.statusCode==500){
            toast.error(data.message)
        }else if(data.statusCode==401){
            toast.error(data.message)
        }else if(data.statusCode==200){
            return {data: data.message, pages: data.pages}
        }
        return false
    }catch(e){
        toast.error(e.message)
        return
    }
}

export const getJobWithId = async (id) => {
    try{
        const {data} = await api.get(`/get-job-with-id/${id}`)
        if(data.statusCode==500){
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

export const getLatest = async () => {
    try{
        const {data} = await api.get(`/get-latest-jobs`)
        if(data.statusCode==500){
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