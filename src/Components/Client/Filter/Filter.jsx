import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Filter = ({ visible , actions , query }) => {

    const navigate = useNavigate()
    const {filters, setFilters} = actions

    useEffect(()=>{
        query.set("page", 1)
        navigate(`/jobs?${query}`)
    },[])

    const addFilter = (key, value) => {
        if(filters[key] != value){
            const filter = {...filters, [key]: value}
            setFilters(filter)
            query.set(key, value)
            navigate(`/jobs?${query}`)
        }else{
            const filter = {...filters, [key]: ""}
            setFilters(filter)
            query.delete(key)
            navigate(`/jobs?${query}`)
        }
    }

    return (
        <>
            <div className={`${visible} md:col-span-4 lg:col-span-3 rounded-xl shadow shadow-gray-400 py-4 px-5 font-primary`}>
                {
                    Object.entries(filters).length > 0 && <div className="flex gap-2 flex-row flex-wrap mb-3">
                    {
                        Object.entries(filters).filter(item => item[1]!="" && item[0]!="q").map(items => {
                            return(
                                <div key={items[1]} className="p-1 px-2 shadow shadow-gray-400 rounded-xl whitespace-pre-wrap">{items[0]=="page" ? "Page: "+items[1] : items[1]}</div>
                            )
                        })
                    }
                    </div>
                }
                <div className="flex flex-col">
                    <h4 className="text-xl mb-6">Sort</h4>
                    <div className="flex items-center">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.sort == "Latest" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("sort", "Latest")}>{ filters.sort == "Latest" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Latest</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.sort == "Amount Low-High" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("sort", "Amount Low-High")}>{ filters.sort == "Amount Low-High" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Amount Low-High</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.sort == "Amount High-Low" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("sort", "Amount High-Low")}>{ filters.sort == "Amount High-Low" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Amount High-Low</span>
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <h4 className="text-xl mb-6">Experience Level</h4>
                    <div className="flex items-center">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.experienceLevel == "Beginner" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("experienceLevel", "Beginner")}>{ filters.experienceLevel == "Beginner" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Beginner</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.experienceLevel == "Intermediate" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("experienceLevel", "Intermediate")}>{ filters.experienceLevel == "Intermediate" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Intermediate</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.experienceLevel == "Expert" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("experienceLevel", "Expert")}>{ filters.experienceLevel == "Expert" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Expert</span>
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <h4 className="text-xl mb-6">Job Type</h4>
                    <div className="flex items-center">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.jobType == "Full Time" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("jobType", "Full Time")}>{ filters.jobType == "Full Time" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Full Time</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.jobType == "Part Time" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("jobType", "Part Time")}>{ filters.jobType == "Part Time" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Part Time</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.jobType == "Flexible" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("jobType", "Flexible")}>{ filters.jobType == "Flexible" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Flexible</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.jobType == "Contract" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("jobType", "Contract")}>{ filters.jobType == "Contract" && <i className="fa fa-check text-white"></i> }</div>
                        <span>Contract</span>
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <h4 className="text-xl mb-6">Amount</h4>
                    <div className="flex items-center">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.amount == "₹0 - ₹1K" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("amount", "₹0 - ₹1K")}>{ filters.amount == "₹0 - ₹1K" && <i className="fa fa-check text-white"></i> }</div>
                        <span>₹0 - ₹1K</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.amount == "₹1K - ₹10K" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("amount", "₹1K - ₹10K")}>{ filters.amount == "₹1K - ₹10K"  && <i className="fa fa-check text-white"></i> }</div>
                        <span>₹1K - ₹10K</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.amount == "₹10K - ₹50K" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("amount", "₹10K - ₹50K")}>{ filters.amount == "₹10K - ₹50K"  && <i className="fa fa-check text-white"></i> }</div>
                        <span>₹10K - ₹50K</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.amount == "₹50K - ₹500K" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("amount", "₹50K - ₹500K")}>{ filters.amount == "₹50K - ₹500K"  && <i className="fa fa-check text-white"></i> }</div>
                        <span>₹50K - ₹500K</span>
                    </div>
                    <div className="flex items-center mt-3">
                        <div className={`w-6 h-6 border-2 mr-2 flex justify-center items-center border-gray-500 rounded-md ${filters.amount == "₹500K+" && `bg-gray-500`} cursor-pointer`} onClick={()=>addFilter("amount", "₹500K+")}>{ filters.amount == "₹500K+"  && <i className="fa fa-check text-white"></i> }</div>
                        <span>₹500K+</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter
