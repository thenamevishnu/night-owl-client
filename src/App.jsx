import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/Common/LandingPage"
import RegisterPage from "./Pages/Common/RegisterPage"
import LoginPage from "./Pages/Common/LoginPage"
import { Toaster } from "react-hot-toast"
import { IsLoggedRoute } from "./ProtectedRoute"
import JobsPage from "./Pages/Client/JobsPage"
import PostJobPage from "./Pages/Developer/PostJobPage"
import ViewJobPage from "./Pages/Client/ViewJobPage"

const App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route exact path="/" element={<LandingPage/>} />
                    <Route path="/register" element={<IsLoggedRoute><RegisterPage/></IsLoggedRoute>} />
                    <Route path="/login" element={<IsLoggedRoute><LoginPage/></IsLoggedRoute>} />
                    
                    <Route path="/jobs" element={<JobsPage/>}/>
                    <Route path="/view-job" element={<ViewJobPage/>} />

                    <Route path="/post-job" element={<PostJobPage/>} />

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