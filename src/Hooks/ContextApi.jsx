import { createContext, useContext } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    return (
        <MyContext.Provider>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => { 
    return useContext(MyContext) 
}