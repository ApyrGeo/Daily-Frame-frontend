//import { useContext } from "react"
//import { UserContext } from "../contexts/userContext"
import { Navigate, Outlet } from "react-router-dom";


const AuthRoutes=()=>{
    const name = localStorage.getItem("name");

    return ( name!==null ? <Outlet /> : <Navigate to="/"/> );
}

export default AuthRoutes