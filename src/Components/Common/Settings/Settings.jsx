import { useState } from "react"
import Header from "../Header/Header"
import SideMenu from "./SideMenu"
import { useSelector } from "react-redux"
import DevProfile from "./Developer/DevProfile"
import ClientProfile from "./Client/ClientProfile"

const Settings = () => {

    const [clicked, setClicked] = useState(null)
    const {type} = useSelector(state => state.user)

    const getClickedMenu = (menu) => {
        setClicked(menu)
    }

    return (
        <>
            <Header/>
            <div className="grid grid-cols-12 px-2 md:px-10 gap-3 mt-20">
                <SideMenu callback={getClickedMenu} className={"hidden md:block"}/>
                <div className="md:col-span-8 lg:col-span-9 col-span-12 font-primary">
                    {
                        clicked == null ? type=="Developer" ? <DevProfile/> : <ClientProfile/> : null

                    }     
                </div>
            </div>
        </>
    )
}

export default Settings
