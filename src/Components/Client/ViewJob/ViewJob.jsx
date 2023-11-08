import { useLocation } from "react-router-dom";
import Header from "../../Common/Header/Header"
import { useEffect, useState } from "react";
import { getJobWithId } from "../../../Services/post";
import { getUserById } from "../../../Services/user";
import * as number_format from "millify"
import moment from "moment";
import Loading from "../../Common/Loading/Loading";

const ViewJob = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const id = query.get("id")
    const timestamp = query.get("timestamp")
    const [job, setJob] = useState({})
    const [author, setAuthor] = useState({})
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async () => {
            const jobData = await getJobWithId(id)
            const posted = jobData.postedBy
            const userData = await getUserById(posted)
            setJob(jobData)
            setAuthor(userData)
            if(jobData._id && userData._id){
                setTimeout(() => {
                    setIsLoading(false)
                }, 200);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Header/>
            {
                isLoading ? <Loading/> : <div className="px-2 md:px-10 mt-20 grid gap-3 grid-cols-12">
                <div className="col-span-12 md:col-span-8 lg:col-span-9">
                    <div className="shadow shadow-black p-3 rounded-xl overflow-clip">
                        <h2 className="text-lg text-green-700 whitespace-pre-wrap">{job?.title}</h2>
                        <p className=" whitespace-pre-wrap mt-2">{job.experienceLevel} - {job.jobType}</p>
                        <p className=" whitespace-pre-wrap mt-2">{job.description}</p>
                        <p className=" whitespace-pre-wrap mt-2">Amount: ₹{number_format.millify(job.minPay)} - ₹{number_format.millify(job.maxPay)}</p>
                        <div className="flex items-center flex-wrap gap-1 mt-2">
                            <div>Tags: </div>
                            {
                                job?.tags?.map(item => {
                                    return(
                                        <div key={item} className="bg-red-700 bg-opacity-60 text-white rounded-xl p-0.5 px-2">{item}</div>
                                    )
                                })
                            }
                        </div>
                        <p className="mt-2">Posted: <span>{moment(job.createdAt).fromNow()}</span></p>
                    </div>
                </div>
                <div className="shadow shadow-black p-3 hidden md:block md:col-span-4 lg:col-span-3 rounded-xl">
                    <div className="flex justify-center">
                            <img className="rounded-full w-28 h-28" src={author.picture}/>
                    </div>
                    <div className="text-center mt-3">
                        <p>{author.name} {author.is_verified && <i className="fa fa-circle-check text-blue-700 text-sm"></i>}</p>
                        <p className="text-sm relative">@{author.username} <i onClick={()=>{ navigator.clipboard.writeText(`@${author.username}`); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className={`${copied ? `fa fa-check` : `fa fa-copy`} ml-1 cursor-pointer text-gray-600`}></i></p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ViewJob
