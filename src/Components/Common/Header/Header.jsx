import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../../Redux/UserSlice/user"

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {picture} = useSelector(state => state.user)

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
                <p className="font-primary cursor-pointer" onClick={()=>navigate("/jobs")}>Find Jobs</p>
                {picture ? 
                <div className="relative group">
                    <img src={picture} alt="profile" className="w-10 h-10 cursor-pointer rounded-full"/>
                    <section className="absolute h-0 group-hover:h-auto px-0 py-0 group-hover:px-3 group-hover:py-2 bg-black right-5 duration-150 rounded-xl transition-all ease-linear">
                        <div className=" hidden group-hover:block text-white cursor-pointer" onClick={logout}>Logout</div>
                    </section>
                </div>
                : 
                <button className="bg-violet-800 rounded-lg px-3 p-1 font-primary text-white" onClick={()=>navigate("/login")}>Login</button>}
                
            </div>
        </div>
    )
}

export default Header
