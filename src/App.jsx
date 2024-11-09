import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Loginpage from "./pages/Loginpage"
//import Nothing from "./pages/Nothing"
import RegisterPage from "./pages/Registerpage"
import AuthRoutes from "./routes/authROutes"
import GuestRoutes from "./routes/guestRoutes"
import CreatePost from "./pages/Createpost"

const App = () =>{
    return (
      <BrowserRouter>
        <Routes>

          <Route element={<GuestRoutes />}>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/" element={<Homepage isGuest={true} isPersonal={false}/>}></Route>
            <Route path="/login" element={<Loginpage/>}></Route>
            <Route path="*" element={<Navigate to="/"/>}></Route>
          </Route>

          <Route element={<AuthRoutes />}>
            <Route path="/dashboard" element={<Homepage isGuest={false} isPersonal={false}/>}></Route>
            <Route path="/dashboard/posts" element={<Homepage isGuest={false} isPersonal={true} />}></Route>
            <Route path="/dashboard/createpost" element={<CreatePost/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    )
}
export default App
