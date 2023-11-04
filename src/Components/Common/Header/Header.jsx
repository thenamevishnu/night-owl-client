import { useNavigate } from "react-router-dom"

const Header = ({ role }) => {

    const navigate = useNavigate()

    return (
        <div className="w-screen top-0 z-10 fixed h-16 flex justify-between px-2 md:px-10 items-center bg-primary shadow shadow-[#aaa]">     
            <div className="flex items-center cursor-pointer" onClick={ () => navigate("/")}>
                <img src="./owl.jpg" className="rounded-full w-8 h-8"/>
                <span className=" uppercase ml-2 text-xl font-semibold font-mono">Night Owl</span>
            </div>
            <div className="flex items-center text-base gap-6">
                <p className="font-primary cursor-pointer">Find Jobs</p>
                {role == null && <button className="bg-violet-800 rounded-lg px-3 p-1 font-primary text-white" onClick={()=>navigate("/register")}>Login</button>}
            </div>
        </div>
    )
}

export default Header
