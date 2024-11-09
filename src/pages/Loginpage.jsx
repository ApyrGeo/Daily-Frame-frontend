import { useContext, useState } from "react";
import Alert from "../components/Alert"
import MainHeader from "../components/Header"
import { loginUser } from "../controllers/userController";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Loginpage = () =>{
    const {setUser} = useContext(UserContext);

    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try{
            await loginUser(name, password);
            setUser({name, posts: []});

            navigate("/dashboard");
        }catch(error){
            setError(error.message);
        }
    }
    return(
        <>
        <MainHeader isGuest={true}/>
        <div className="mt-10 flex flex-col items-center mx-3">
        <div className="mt-10 bg-blue-950 rounded-2xl px-5 ring-blue-300 ring-2 flex flex-col items-center">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center text-cyan-100 text-4xl mb-5">Log in</h3>

                <input value={name} onChange={(e)=> setName(e.target.value)} type="username" placeholder="Username" autoFocus className="w-full focus:ring-4 rounded-md p-2 placeholder:text-gray-800 outline-0 border-0 mb-4 ring-blue-300 bg-cyan-100"></input>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="w-full focus:ring-4 rounded-md p-2 placeholder:text-gray-800 outline-0 border-0 mb-4 ring-blue-300 bg-cyan-100"></input>

                <button className="w-full outline-1 outline-cyan-100 border-0 rounded-md p-2 content-center bg-blue-300 hover:bg-cyan-100 mt-4 mb-4">Log in</button>
                {error && <Alert msg={error}/>}
            </form>
        </div>
        </div>
        </>
    )

}

export default Loginpage