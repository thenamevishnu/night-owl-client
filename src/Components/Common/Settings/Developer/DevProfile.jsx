import React, { useEffect, useRef, useState } from 'react'
import { getUserById } from '../../../../Services/user'
import { useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'

const DevProfile = () => {
    
    const {id, type} = useSelector(state=>state.user)
    const [myData, setMyData] = useState({})
    const scrollHorizontal = useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserById(id)
            setMyData(response)
            if(response._id){
                setTimeout(() => {
                    setIsLoading(false)
                }, 200);
            }
        }
        fetchUser()
    }, [])

    return (
        <>
            {
                isLoading ? <Loading/> : 
                <>
                    <div className="grid grid-cols-12 gap-2">
                        <div className='flex text-center justify-center flex-col items-center shadow shadow-gray-500 rounded-xl p-3 col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3'>
                            <label>
                                <div className=' rounded-full w-24 h-24 cursor-pointer group relative  overflow-hidden'>
                                    <span className='bg-black bg-opacity-40 rounded-full w-full group-hover:h-8 duration-200 ease-linear h-0 absolute bottom-0 left-0'><i className='fa fa-camera mt-1 text-xl text-white'></i></span>
                                    <img src={myData.picture} className='rounded-full w-24 shadow shadow-black cursor-pointer' alt='profile pic'/>
                                </div>
                                <input type='file' className='hidden'/>
                            </label>
                            <div className='mt-3'>
                                <p>{myData.name} </p>
                                <p className='text-sm'>@{myData.username}</p> 
                            </div>   
                        </div>
                        <div className='relative col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 shadow shadow-gray-500 rounded-xl p-3'>
                            <div>
                                <h4 className=' whitespace-pre-wrap'>Title: {myData.resume.title}</h4>
                                <p className='mt-3'>Hourly: ₹{myData.resume.rate_per_hr}</p>
                                <p className='mt-3 whitespace-pre-wrap'>{myData.resume.description}</p>
                            </div>
                            <i className='fa fa-pen bg-gray-300 p-2 absolute rounded-full top-2 right-2 shadow-inner shadow-gray-800 text-gray-600 flex-shrink-0'></i>
                        </div>
                    </div>

                    <div className='shadow shadow-gray-500 rounded-xl p-3 mt-2 relative'>
                        <i className='fa fa-pen bg-gray-300 p-2 absolute rounded-full top-2 right-2 shadow-inner shadow-gray-800 text-gray-600 flex-shrink-0'></i>
                        <h1 className='mb-3 text-lg'>Skills</h1>
                        <div className='relative overflow-x-scroll overflow-y-hidden hide-scroll p-2 flex'>
                            {
                                Array(20).fill("Hello").map((item, index) => {
                                    return(
                                        <div className='p-1 px-2 rounded-xl shadow-inner shadow-gray-400 mr-1 relative' key={index}>
                                            <i className='fa fa-close cursor-pointer absolute top-[-0.2rem] right-[-0.2rem] p-0.5 text-xs bg-red-500 rounded-full px-1 text-white'></i>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='mt-2 p-3 relative shadow shadow-gray-500 rounded-xl'>
                        <h1 className='mb-3 text-lg'>Projects</h1>
                        <div className='grid grid-cols-12 gap-3'>
                            {
                                Array(3).fill({name: "Vestido Fashion", link:"https://link.in", createdAt: 1232143224234, language: "java"}).map((item, index) => {
                                    return(
                                        <div key={index} className='mb-2 col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-4 rounded-xl p-3 shadow shadow-gray-500'>
                                            <p>Name: {item.name}</p>
                                            <p>Link: {item.link}</p>
                                            <p>Created At: {item.createdAt}</p>
                                            <p>Language: {item.language}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div className='mt-2 p-3 relative shadow shadow-gray-500 rounded-xl'>
                        <h1 className='mb-3 text-lg'>Certificates</h1>
                        <div className='grid grid-cols-12 gap-3'>
                            {
                                Array(3).fill({name: "Vestido Fashion", link:"https://link.in", createdAt: 1232143224234, language: "java"}).map((item, index) => {
                                    return(
                                        <div key={index} className='mb-2 col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-4 rounded-xl p-3 shadow shadow-gray-500'>
                                            <p>Name: {item.name}</p>
                                            <p>Link: {item.link}</p>
                                            <p>Created At: {item.createdAt}</p>
                                            <p>Language: {item.language}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='mt-2 p-3 relative shadow shadow-gray-500 rounded-xl'>
                        <h1 className='mb-3 text-lg'>Employment History</h1>
                        <div className='grid grid-cols-12 gap-3'>
                            {
                                Array(3).fill({name: "Vestido Fashion", link:"https://link.in", createdAt: 1232143224234, language: "java"}).map((item, index) => {
                                    return(
                                        <div key={index} className='mb-2 col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-4 rounded-xl p-3 shadow shadow-gray-500'>
                                            <p>Name: {item.name}</p>
                                            <p>Link: {item.link}</p>
                                            <p>Created At: {item.createdAt}</p>
                                            <p>Language: {item.language}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DevProfile
