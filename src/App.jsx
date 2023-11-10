import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/Common/LandingPage"
import RegisterPage from "./Pages/Common/RegisterPage"
import LoginPage from "./Pages/Common/LoginPage"
import { Toaster } from "react-hot-toast"
import { IsLoggedRoute, ProtectedClientRoute, ProtectedCommonRoute, ProtectedDevRoute } from "./ProtectedRoute"
import JobsPage from "./Pages/Client/JobsPage"
import PostJobPage from "./Pages/Developer/PostJobPage"
import ViewJobPage from "./Pages/Client/ViewJobPage"
import NotFound404 from "./Components/Common/NotFound404"
import SettingsPage from "./Pages/Common/SettingsPage"

const App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route exact path="/" element={<LandingPage/>} />
                    <Route path="/register" element={<IsLoggedRoute><RegisterPage/></IsLoggedRoute>} />
                    <Route path="/login" element={<IsLoggedRoute><LoginPage/></IsLoggedRoute>} />
                    
                    <Route path="/settings" element={<ProtectedCommonRoute><SettingsPage/></ProtectedCommonRoute>} />

                    <Route path="/jobs" element={<ProtectedDevRoute><JobsPage/></ProtectedDevRoute>}/>
                    <Route path="/view-job" element={<ProtectedDevRoute><ViewJobPage/></ProtectedDevRoute>} />

                    <Route path="/post-jobs" element={<ProtectedClientRoute><PostJobPage/></ProtectedClientRoute>} />

                    <Route path="*" element={<NotFound404/>} />

                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default App