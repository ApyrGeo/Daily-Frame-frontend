/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/userContext";
import { AppBar } from "@material-ui/core";


const MainHeader = ({isGuest, isPersonal}) =>{
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout=()=>{
        if(confirm("Confirm Logout?"))
        {
            setUser({name: null, posts: []});
            localStorage.removeItem("token");
            localStorage.removeItem("name");

            navigate("/");
            window.location.reload(false);
        }
    }
    return(
        <AppBar className="header">
            <nav className="flex items-stretch justify-around gap-3">
                <div className="flex items-center">
                    {isGuest?
                        <Link to="/" className="fa-solid fa-house-chimney hover nav-link text-cyan-100 hover:text-blue-500"></Link>:      
                        (
                            !isPersonal?
                            <Link to="/dashboard/posts" className="fa-solid fa-user text-cyan-100 hover:text-blue-300"></Link>:
                            <Link to="/dashboard" className="fa-solid fa-house-chimney text-cyan-100 hover:text-blue-300"></Link>
                        )
                    }
                    <Link className="fa-solid fa-house-chimney nav-link text-transparent"></Link>
                </div>
                <div><p className="text-cyan-100 text-4xl text-center">DailyFrame</p></div>
               

                {isGuest ? 
                <div className="flex items-center gap-6">
                    <Link to="/login" className="fa-solid fa-right-to-bracket text-cyan-100 hover:text-blue-300"></Link>
                    <Link to="/register" className="fa-solid fa-user-plus text-cyan-100 hover:text-blue-300"></Link>
                </div> : 
                <div className="flex items-center gap-6">
                    <Link to="/dashboard/createpost" className="fa-solid fa-circle-plus text-cyan-100 hover:text-blue-300"></Link>
                    <Link onClick={handleLogout} className="fa-solid fa-door-open text-cyan-100 hover:text-blue-300"></Link>
                </div>}
                
            </nav>
        </AppBar>

    )
}

export default MainHeader