import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./Services/user"
import { useSelector } from "react-redux"

export const ProtectedDevRoute = ({ children }) => {

    const {type} = useSelector(state=>state.user)

    const isAuth = isAuthenticated()
    if(isAuth){
        if(type=="Developer"){
            return children
        }else{
            return <Navigate to={"/"} />
        }
    }else{
        return <Navigate to={"/login"} />
    }
}

export const ProtectedCommonRoute = ({ children }) => {

    const isAuth = isAuthenticated()
    if(isAuth){
        return children
    }else{
        return <Navigate to={"/login"} />
    }
}

export const ProtectedClientRoute = ({ children }) => {

    const {type} = useSelector(state=>state.user)

    const isAuth = isAuthenticated()
    if(isAuth){
        if(type=="Client"){
            return children
        }else{
            return <Navigate to={"/"} />
        }
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