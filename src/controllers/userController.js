import { API_ADRESS } from "../../constants/constants";

const loginUser = async(name, password) =>{

    if(!name || !password)
        throw Error("All fields are required!");

    const res = await fetch(`${API_ADRESS}/api/users/login`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name, password})
    })
    const data = await res.json();

    if(!res.ok)
        throw Error(data.error);

    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);

    return data;
}
const registerUser = async(name, password, cpassword)=>{
    if(!name || !password || !cpassword)
        throw Error("All fields are required!");

    if(password!==cpassword)
        throw new Error("Passwords do not match!");

    const res = await fetch(`${API_ADRESS}/api/users`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name, password, cpassword})
    })
        
    const data = await res.json();

    if(!res.ok) 
        throw Error(data.error);

    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);

    return data;
}

export {loginUser, registerUser}