import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Header role={null}/>
            <div className="mt-20 flex justify-center font-primary">
                <form className="w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={handleSubmit}>
                    <h1 className=" text-center font-medium text-xl mb-5">Login Now</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Username" className=" outline-none p-2 w-full"/>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-key"></i>
                        <input type="password" placeholder="Password" className=" outline-none p-2 w-full"/>
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1 px-2" type="submit">Login</button>
                        <p className="mt-3 text-sm">Don't have an account? <span onClick={()=>navigate("/register")} className="text-blue-900 cursor-pointer">Create</span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
