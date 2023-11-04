import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/Common/LandingPage"
import RegisterPage from "./Pages/Common/RegisterPage"
import LoginPage from "./Pages/Common/LoginPage"

const App = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App