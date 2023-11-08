import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./Services/user"

export const ProtectedRoute = ({ children }) => {
    const isAuth = isAuthenticated()
    if(isAuth){
        return children
    }else{
        return <Navigate to={"/login"} />
    }
}

export const IsLoggedRoute = ({ children }) => {
    const isAuth = isAuthenticated()
    if(isAuth){
        return <Navigate to={"/"} />
    }else{
        return children
    }
}