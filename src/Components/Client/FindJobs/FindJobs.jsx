import { useEffect, useRef, useState } from "react"
import Header from "../../Common/Header/Header"
import Filter from "../Filter/Filter"
import { getFullJobs } from "../../../Services/post"
import moment from "moment/moment"
import { useLocation, useNavigate } from "react-router-dom"
import Pagination from "../../Common/Pagination/Pagination"
import * as number_format from "millify"
import Loading from "../../Common/Loading/Loading"

const FindJobs = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const sort = query.get("sort")
    const experienceLevel = query.get("experienceLevel")
    const jobType = query.get("jobType")
    const amount = query.get("amount")
    const q = query.get("q")
    const page = query.get("page")
    const pages = useRef(null)
    const [jobs, setJobs] = useState([])
    const [filters, setFilters] = useState({experienceLevel: experienceLevel || "", jobType: jobType || "", amount: amount || "", sort: sort || "", q: q || "", page: page || 1})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getJobs = async () => {
            const job = await getFullJobs(filters)
            setJobs(job.data)
            pages.current = job.pages
            if(Array.isArray(job.data)){
                setTimeout(() => {
                    setIsLoading(false)
                }, 200);
            }
        }
        getJobs()
    }, [filters])

    const updatePage = (page) => {
        setFilters({...filters, page: page})
        query.set("page", page)
        navigate("/jobs?"+query)
        window.scrollTo({top:0, behavior:"smooth"})
    }

    useEffect(()=>{
        if(filters.q){
            query.set("q", filters.q)
            query.set("page", 1)
            setFilters({...filters, page: 1})
            navigate("/jobs?"+query)
        }else{
            query.delete("q")
            navigate("/jobs?"+query)
        }
    },[filters.q])

    return (
        <>
            <Header/>
            <div className="px-2 md:px-10 mt-20 grid gap-3 grid-cols-12">
                <Filter visible={"hidden md:block"} actions={{filters, setFilters}} query={query}/>
                <div className="col-span-12 md:col-span-8 lg:col-span-9 font-primary rounded-xl relative">
                        <div className="flex justify-between items-center">
                            <div className="text-xl uppercase hidden md:block">job board</div>
                            <div className="md:hidden group pr-3 shadow shadow-gray-500 p-3 mr-2 rounded-xl mb-2 flex justify-center items-center cursor-pointer">
                                <i className="fa fa-chevron-right"></i>
                                <section className="absolute bg-white top-16 left-[-30rem] duration-500 transition-all group-hover:left-0 w-[250px]">
                                    <Filter visible={"md:hidden"} actions={{filters, setFilters}} query={query}/>
                                </section>
                            </div>
                            <div className="flex w-full md:w-[300px] lg:w-[400px] xl:w-[550px] items-center shadow shadow-gray-500 rounded-xl mb-2">
                                <input type="text" name="q" className="p-2 w-full outline-none rounded-xl" value={filters.q} onChange={e=>setFilters({...filters, q: e.target.value})} />
                                <i className="fa fa-search pr-2 cursor-pointer"></i>
                            </div>
                        </div>
                        {
                            isLoading ? <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"><Loading/></div> : jobs.length==0 ? <div className="flex flex-col justify-center items-center animate-floating">
                            <img src="./noresult.jpg" className="w-96"/>
                            <h4 className="">Please try a different combination of filters</h4>
                        </div>  : <>{
                            jobs.map(items => {
                                return(
                                    <div key={items._id} className="w-full shadow shadow-gray-500 mb-2 rounded-xl p-2">
                                        <div className="flex justify-between items-baseline">
                                            <h2 className="text-lg text-green-700 whitespace-pre-wrap cursor-pointer" onClick={()=>navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>{items.title}</h2>
                                            <div className="w-[30px] h-[30px] flex-shrink-0 flex justify-center items-center rounded-full bg-gray-800 bg-opacity-70">
                                                <i className="far fa-bookmark text-white"></i>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm">{items.experienceLevel} - {items.jobType}</p>
                                        <p className="whitespace-pre-wrap mt-2">{items.description.length <= 500 ? items.description.slice(0,500) : items.description.slice(0,500)+"..."}</p>
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
                            })
                        }
                        <Pagination updatePage={updatePage} count={Array(pages?.current).fill(0)}/>
                          </>
} 

                        {/* {
                            jobs.map(items => {
                                return(
                                    <div key={items._id} className="w-full shadow shadow-gray-500 mb-2 rounded-xl p-2">
                                        <div className="flex justify-between items-baseline">
                                            <h2 className="text-lg text-green-700 whitespace-pre-wrap cursor-pointer" onClick={()=>navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>{items.title}</h2>
                                            <div className="w-[30px] h-[30px] flex-shrink-0 flex justify-center items-center rounded-full bg-gray-800 bg-opacity-70">
                                                <i className="far fa-bookmark text-white"></i>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm">{items.experienceLevel} - {items.jobType}</p>
                                        <p className="whitespace-pre-wrap mt-2">{items.description.length <= 500 ? items.description.slice(0,500) : items.description.slice(0,500)+"..."}</p>
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
                            })
                        }
                        {
                            jobs.length==0 && <div className="flex flex-col justify-center items-center animate-floating">
                                <img src="./noresult.jpg" className="w-96"/>
                                <h4 className="">Please try a different combination of filters</h4>
                            </div>  
                        }
                        <Pagination updatePage={updatePage} count={Array(pages?.current).fill(0)}/> */}
                </div>
            </div>
        </>
    )
}

export default FindJobs
