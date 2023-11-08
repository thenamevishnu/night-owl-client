import { useState } from "react"
import Header from "../../Common/Header/Header"
import { camelCase } from "../../../utils/CamelCase"
import toast from "react-hot-toast"
import { validateJobPost } from "../../../Services/post"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PostJob = () => {

    const navigate = useNavigate()
    const [postData, setPostData] = useState({title:"",description:"",minPay:"",maxPay:"",experienceLevel:"",jobType:"",tags:[]})
    const [tag, setTag] = useState("")
    const {id} = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        for(let key in postData){
            if(key=="tags"){
                if(postData[key].length == 0){
                    toast.error("Enter atleast one tag")
                    return
                }
            }
            if(postData[key]==""){
                toast.error(`${key.replace(key[0], key[0].toUpperCase())} is empty`)
                return
            }
        }
        postData.postedBy = id
        const response = await validateJobPost(postData)
        if(response){
            setTimeout(() => {
                navigate("/jobs")
            }, 1000);
        }
    }

    const addTag = () => {
        if(postData.tags.length >= 10){
            toast.error("Maximum 10 tags!")
            return
        }
        const tags = camelCase(tag)
        if(!postData.tags.includes(tags)){
            setPostData({...postData, tags: [...postData.tags, tags]})
            setTag("")
        }else{
            toast.error(`${tags} already exist`)
        }
    }

    const removeTag = (item) => {
        const index = postData.tags.indexOf(item)
        postData.tags.splice(index,1)
        setPostData({...postData, tags: postData.tags})
    }

    return (
        <>
            <Header/>
            <div className="mt-20 flex justify-center font-primary px-2 md:px-10">
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Post Jobs</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-heading"></i>
                        <input type="text" placeholder="Job Title" className=" outline-none p-2 w-full" name="title" value={postData.title} onChange={e=> setPostData({...postData,[e.target.name]: e.target.value})}/>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fab fa-readme"></i>
                        <textarea type="text" placeholder="Description" className=" outline-none p-1.5 w-full resize-none hide-scroll" rows={1} name="description" value={postData.description} onChange={e=> setPostData({...postData,[e.target.name]: e.target.value})}/>
                    </div>
                    <div className="flex w-full gap-3">
                        <div className="p-1 px-2 mt-3 rounded-xl w-1/2 shadow shadow-black flex items-center">
                            <i className="fa fa-dollar"></i>
                            <input type="text" placeholder="Min Pay" className=" outline-none p-2 w-full" name="minPay" value={postData.minPay} onChange={e=> setPostData({...postData,[e.target.name]: e.target.value})}/>
                        </div>
                        <div className="p-1 px-2 mt-3 rounded-xl w-1/2 shadow shadow-black flex items-center">
                            <i className="fa fa-dollar"></i>
                            <input type="text" placeholder="Max Pay" className=" outline-none p-2 w-full" name="maxPay" value={postData.maxPay} onChange={e=> setPostData({...postData,[e.target.name]: e.target.value})}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full gap-3">
                        <div onClick={()=>setPostData({...postData, experienceLevel: "Beginner"})} className="p-2 px-3 mt-3 rounded-xl cursor-pointer col-span-4 relative shadow shadow-black flex items-center justify-center">
                            <span className="">Beginner {postData.experienceLevel == "Beginner" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                        <div onClick={()=>setPostData({...postData, experienceLevel: "Intermediate"})} className="p-2 px-3 mt-3 rounded-xl cursor-pointer shadow col-span-4 shadow-black relative flex items-center justify-center">
                            <span className="">Intermediate {postData.experienceLevel == "Intermediate" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                        <div onClick={()=>setPostData({...postData, experienceLevel: "Expert"})} className="p-2 px-3 mt-3 rounded-xl cursor-pointer shadow col-span-4 shadow-black flex relative items-center justify-center">
                            <span className="">Expert {postData.experienceLevel == "Expert" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                    </div>
                    <div className="flex w-full gap-3">
                        <div onClick={()=>setPostData({...postData, jobType: "Full Time"})} className="p-2 relative px-3 mt-3 rounded-xl cursor-pointer justify-center w-full shadow shadow-black flex items-center">
                            <span className="">Full Time {postData.jobType == "Full Time" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                        <div onClick={()=>setPostData({...postData, jobType: "Part Time"})} className="p-2 relative px-3 mt-3 rounded-xl cursor-pointer justify-center shadow w-full shadow-black flex items-center">
                            <span className="">Part Time {postData.jobType == "Part Time" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                    </div>
                    <div className="flex w-full gap-3">
                        <div onClick={()=>setPostData({...postData, jobType: "Flexible"})} className="p-2 relative px-3 mt-3 rounded-xl cursor-pointer justify-center shadow w-full shadow-black flex items-center">
                            <span className="">Flexible {postData.jobType == "Flexible" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                        <div onClick={()=>setPostData({...postData, jobType: "Contract"})} className="p-2 relative px-3 mt-3 rounded-xl cursor-pointer justify-center shadow shadow-black w-full flex items-center">
                            <span className="">Contract {postData.jobType == "Contract" && <i className="fa fa-circle-check absolute text-green-700 top-[-0.3rem] right-[-0.3rem]"></i>}</span>
                        </div>
                    </div>
                    <div className="p-1 mt-3 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-hashtag"></i>
                        <input type="text" placeholder="Tags" className=" outline-none p-2 w-full" value={tag} onChange={e=>e.target.value.length <= 20 && setTag(e.target.value)}/>
                        <i className="fa fa-check text-green-700 font-bold cursor-pointer" onClick={addTag}></i>
                    </div>
                    <div className="mt-3 flex flex-row flex-wrap gap-2 justify-center">
                        {
                            postData.tags.map(item => {
                                return (
                                    <div key={item} className="p-1 px-2 shadow shadow-gray-500 rounded-lg cursor-pointer relative">{item} <i className=" absolute top-[-0.25rem] right-[-0.25rem] fa fa-close text-red-600 text-sm" onClick={()=>removeTag(item)}></i></div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col text-center justify-center mt-3">
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1 px-2" type="submit"><i className="fa fa-paper-plane"></i> POST NOW</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PostJob
