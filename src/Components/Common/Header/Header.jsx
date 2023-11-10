import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../../Redux/UserSlice/user"
import { useState } from "react"

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {picture, name, type} = useSelector(state => state.user)
    const [isOption, showOption] = useState(false)

    const logout = () => {
        const initialState = {
            id: "",
            name: "",
            username:"",
            email:"",
            picture:"",
            is_google:"",
            type:""
        }
        dispatch(updateUser(initialState))
        localStorage.removeItem("userToken")
        navigate("/")
    }

    return (
        <div className="w-screen top-0 z-10 fixed h-16 flex justify-between px-2 md:px-10 items-center bg-primary shadow shadow-[#aaa]">     
            <div className="flex items-center cursor-pointer" onClick={ () => navigate("/")}>
                <img src="./owl.jpg" className="rounded-full w-8 h-8"/>
                <span className=" uppercase ml-2 text-xl font-semibold font-mono">Night Owl</span>
            </div>
            <div className="flex items-center text-base gap-6">
                <p className="font-primary cursor-pointer" onClick={()=>navigate(type=="Developer" ? "/jobs" : "/post-jobs")}>{type=="Developer" ? "Find Jobs" : type && <button className="px-2 p-1 bg-green-800 rounded-xl bg-opacity-80 text-white"><i className="fa fa-paper-plane"></i> Post Job</button>}</p>
                {type ? 
                <div className="relative">
                    <img src={picture} alt="profile" className="w-10 h-10 cursor-pointer rounded-full" onClick={()=>showOption(!isOption)}/>
                    <section className={`absolute w-[250px] p-3 shadow shadow-black text-center opacity-0  right-0 top-16 bg-white ${isOption ? `opacity-100 pointer-events-auto` : `pointer-events-none`} duration-200 rounded-xl transition-all ease-linear`}>
                        <div className="flex justify-center flex-col items-center cursor-pointer" onClick={ () => navigate("/")}>
                            <img src={picture} className="rounded-full w-20 h-20"/>
                            <span className=" uppercase ml-2 text-xl font-semibold font-mono">{name}</span>
                            <span className="text-sm">Role: {type}</span>
                        </div>
                        <div className="text-black hover:bg-gray-500 p-1 px-2 mt-5 bg-gray-200 rounded-lg hover:text-white cursor-pointer" onClick={()=>navigate("/settings")}>Settings</div>
                        <div className="text-black cursor-pointer hover:bg-gray-500 p-1 bg-gray-200 mt-2 px-2 rounded-lg hover:text-white" onClick={logout}>Logout</div>
                    </section>
                </div>
                : 
                <button className="bg-violet-800 rounded-lg px-3 p-1 font-primary text-white" onClick={()=>navigate("/login")}>Login</button>}
                
            </div>
        </div>
    )
}

export default Header
