import { API_ADRESS } from "../../constants/constants";

const checkUserLiked = async(postId) =>{

    const res = await fetch(`${API_ADRESS}/api/posts/${postId}`,{
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    const data = res.json();

    if(!res.ok)
        throw Error(data.error);

    return data;
}

const getPosts = async () => {

    const res = await fetch(`${API_ADRESS}/api/posts`);
    const data = await res.json();

    if(!res.ok)
        throw Error(data.error);

    return data;
}
const getUserPosts = async() =>{
    const res = await fetch(`${API_ADRESS}/api/posts/user/personalposts`,{
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    const data = await res.json();

    if(!res.ok)
        throw Error(data.error);

    return data;
}

const likePost = async(id) =>{
    const res = await fetch(`${API_ADRESS}/api/posts/${id}/likePost`,{
        method: "PATCH",
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });

    const data = res.json();

    if(!res.ok)
        throw Error(data.error);

    return data;
}

const createPost = async(post) =>{

    const {title, message, tags, selectedFile} = post;

    if(!title || !message || !selectedFile || !tags)
        throw Error("All fields are required!");

    const res = await fetch(`${API_ADRESS}/api/posts`,{
        method: "POST",
        headers: {"Content-Type" : "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify(post)
    })
        
    const data = await res.json();

    if(!res.ok) 
        throw Error(data.error);

    return data;
}

const deletePost = async(id) =>{


    const res = await fetch(`${API_ADRESS}/api/posts/${id}`,{
        method: "DELETE",
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })

    const data = res.json();

    if(!res.ok)
        throw Error(data.error);

    return data;
}

export {createPost, checkUserLiked, getPosts, getUserPosts, likePost, deletePost}