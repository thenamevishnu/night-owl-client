import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Common/Header/Header"
import { useEffect, useState } from "react";
import { getJobWithId, saveJob, sendProposal } from "../../../Services/post";
import { getUserById } from "../../../Services/user";
import * as number_format from "millify"
import moment from "moment";
import Loading from "../../Common/Loading/Loading";
import { useSelector } from "react-redux";

const ViewJob = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const post_id = query.get("id")
    const timestamp = query.get("timestamp")
    const [job, setJob] = useState({})
    const [author, setAuthor] = useState({})
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [recommentation, setRecommentaion] = useState([])
    const [myData, setMyData] = useState({})
    const {id} = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(()=>{
        window.scrollTo({top:0, behavior: "smooth"})
    },[timestamp])

    useEffect(()=>{
        const fetchData = async () => {
            const {job, recommentation} = await getJobWithId(post_id)
            const posted = job.postedBy
            const userData = await getUserById(posted)
            const me = await getUserById(id)
            setJob(job)
            setMyData(me)
            setRecommentaion(recommentation)
            setAuthor(userData)
            if(job._id && userData._id && me._id){
                setTimeout(() => {
                    setIsLoading(false)
                }, 200);
            }
        }
        fetchData()
    }, [timestamp])

    const manageJobSave = async () => {
        const response = await saveJob(post_id, id)
        if(response){
            if(!myData.saved_posts.includes(post_id)){
                setMyData({...myData, saved_posts: [...myData.saved_posts, post_id]})
            }else{
                myData.saved_posts.splice(myData.saved_posts.indexOf(post_id),1)
                setMyData({...myData, saved_posts: [...myData.saved_posts]})
            }
        }
    }

    const manageProposal = async () => {
        const response = await sendProposal(post_id, id)
        if(response){
            if(!myData.proposals.includes(post_id)){
                console.log(myData.proposals);
                setMyData({...myData, proposals: [...myData.proposals, post_id]})
            }
        }
    }

    return (
        <>
            <Header/>
            {
                isLoading ? <Loading/> : <>
                    <div className="px-2 md:px-10 mt-20 grid gap-3 grid-cols-12">
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
                                <div className="md:hidden flex items-center flex-row mt-2">
                                    <div className="flex justify-center mr-1.5">
                                            <img className="rounded-full w-10 h-10" src={author.picture}/>
                                    </div>
                                    <div className="text-center flex items-center flex-row">
                                        <p className="text-sm mr-1">{author.name} {author.is_verified && <i className="fa fa-circle-check text-blue-700 text-sm"></i>}</p>
                                        <p className="text-xs relative mr-1"> (@{author.username})<i onClick={()=>{ navigator.clipboard.writeText(`@${author.username}`); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className={`${copied ? `fa fa-check` : `fa fa-copy`} ml-1 cursor-pointer text-gray-600`}></i></p>
                                    </div>
                                </div>
                            </div>        
                        </div>
                        
                        <div className="md:block flex md:col-span-4 justify-between col-span-12 lg:col-span-3">
                            <div className="shadow p-3 shadow-black rounded-xl w-full">
                                <div className="hidden md:block">
                                    <div className="flex justify-center">
                                            <img className="rounded-full md:w-28 md:h-28 w-16 h-16" src={author.picture}/>
                                    </div>
                                    <div className="text-center mt-3">
                                        <p>{author.name} {author.is_verified && <i className="fa fa-circle-check text-blue-700 text-sm"></i>}</p>
                                        <p className="text-sm relative">@{author.username} <i onClick={()=>{ navigator.clipboard.writeText(`@${author.username}`); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className={`${copied ? `fa fa-check` : `fa fa-copy`} ml-1 cursor-pointer text-gray-600`}></i></p>
                                    </div>
                                </div>
                                <div className="flex justify-center sm:flex-row md:flex-col flex-col w-full gap-2 mt-2">
                                    <button className={`${myData?.proposals?.includes(job._id) ? `bg-gray-500` : `bg-green-700`} bg-opacity-90 w-full text-white p-1 rounded-xl px-2`} onClick={async ()=>!myData?.proposals?.includes(job._id) && await manageProposal()}>{myData?.proposals?.includes(job._id) ? <><i className="text-white fa fa-ban p-1 px-2"></i> Proposal Sent</> : <><i className="text-white far fa-hand-pointer p-1 px-2"></i> Send Proposal</>}</button>
                                    <button className={`${myData?.saved_posts?.includes(job._id) ? `bg-red-700` : `bg-violet-700`} bg-opacity-90 w-full text-white p-1 rounded-xl px-2`} onClick={async ()=>await manageJobSave()}>{myData?.saved_posts?.includes(job._id) ? <><i className="text-white fa fa-bookmark"></i> Remove Saved</> : <><i className="text-white far fa-bookmark"></i> Save Post</>}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 md:px-10 mt-6 md:mt-3">
                        <h1 className="text-xl uppercase mb-2">Recommended for you</h1>
                        {
                            recommentation.length > 0 ? recommentation.map(items => {
                                return(
                                    <div key={items._id} className="w-full shadow shadow-gray-500 mb-2 rounded-xl p-2">
                                        <div className="flex justify-between items-baseline">
                                            <h2 className="text-lg text-green-700 whitespace-pre-wrap cursor-pointer" onClick={()=>navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>{items.title}</h2>
                                            <div className="w-[30px] h-[30px] flex-shrink-0 flex justify-center items-center rounded-full bg-gray-800 bg-opacity-70">
                                                <i className="far fa-bookmark text-white"></i>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm">{items.experienceLevel} - {items.jobType}</p>
                                        <p className="whitespace-pre-wrap mt-2">{items.description.replace(/\n/gm, " ").length <= 500 ? items.description.replace(/\n/gm, " ").slice(0,500) : items.description.replace(/\n/gm, " ").slice(0,500)+"..."}</p>
                                        <p className="mt-2">Amount: ₹{number_format.millify(items.minPay)} - ₹{number_format.millify(items.maxPay)}</p>
                                        <div className="flex gap-1 flex-wrap items-center mt-3">
                                            Tags: {
                                                items.tags.map(item => {
                                                    return(
                                                        <div key={item} className="bg-red-700 bg-opacity-60 text-white rounded-xl p-0.5 px-2">{item}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="flex justify-between items-baseline mt-3">
                                            <span>Posted: {moment(items.createdAt).fromNow()}</span>
                                            <button className="p-1 text-sm px-2 bg-purple-900 bg-opacity-50 rounded-xl text-white" onClick={()=>navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>View Job</button>
                                        </div>
                                    </div>
                                )
                            }) : <div className="text-center shadow shadow-gray-600 rounded-xl p-2">
                                <h1>No Recommendations found</h1>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default ViewJob