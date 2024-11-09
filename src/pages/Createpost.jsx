import { useState } from "react";
import Alert from "../components/Alert"
import MainHeader from "../components/Header"
import FileBase from "react-file-base64";
import { CardMedia } from "@material-ui/core";
import { createPost } from "../controllers/postsController";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const CreatePost = ()=>{

    const navigate = useNavigate();

    const [isPosting, setIsPosting] = useState(false);

    const [error, setError] = useState(null);
    const [post, setPost] = useState({
        title: "",
        message: "",
        tags: [],
        selectedFile: ""
    });

    const checkImage = (file) =>{

        let extension = file?.split(':')[1]?.split('/')[0];

        //console.log(extension);
        if(extension === "image") return true;

        return false;
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(isPosting) return;
        try{
            setIsPosting(true);
            await createPost(post);
            navigate("/dashboard");
        }catch(err){
            setError(err.message);
        }
    }
    return(
    <>
        {isPosting ? 
        <>
            <MainHeader isPersonal={true} isGuest={false}/>
            <div className="mt-14">
                <Loading posting={true}/> 
            </div>
        </>
        :
        <>
        <MainHeader isPersonal={true} isGuest={false}/>
        <div className="mt-10 flex flex-col items-center mx-3">
        <div className="mt-10 bg-blue-950 rounded-2xl px-5 ring-blue-300 ring-2 flex flex-col items-center">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center text-cyan-100 text-4xl mb-5">Create a new post</h3>

                <input value={post.title} onChange={(e)=> setPost({...post, title: e.target.value})} type="title" placeholder="Post Title" autoFocus className="w-full focus:ring-4 rounded-md p-2 placeholder:text-gray-800 outline-0 border-0 mb-4 ring-blue-300 bg-cyan-100"></input>
                <input value={post.message} onChange={(e)=> setPost({...post, message: e.target.value})} type="title" placeholder="Message" className="w-full focus:ring-4 rounded-md p-2 placeholder:text-gray-800 outline-0 border-0 mb-4 ring-blue-300 bg-cyan-100"></input>
                <input value={post.tags} onChange={(e)=> setPost({...post, tags: e.target.value.split(',')})} type="tags" placeholder="Tags (separated by ',')" className="w-full focus:ring-4 rounded-md p-2 placeholder:text-gray-800 outline-0 border-0 mb-4 ring-blue-300 bg-cyan-100"></input>

                <div className="bg-cyan-100 outline-0 border-0 mb-4 ring-blue-300 focus:ring-4 rounded-md p-1">
                    <FileBase className="placeholder-cyan-100" type="file" multiple={false} onDone={({base64}) => setPost({...post, selectedFile: base64})}/>
                </div>
                {post.selectedFile &&
                    <div className="mt-5 text-cyan-100 text-1xl">
                    Preview:
                    {checkImage(post.selectedFile) ? 
                        <CardMedia className="w-full h-full rounded-xl outline-2 outline-cyan-100 py-32" component="image" image={post.selectedFile} title={post.title}/> :
                        <CardMedia component="video" controls image={post.selectedFile} title={post.title}/>
                    }
                    </div>
                }

                <button className="w-full outline-1 outline-cyan-100 border-0 rounded-md p-2 content-center bg-blue-300 hover:bg-cyan-100 mt-4 mb-4">Submit</button>
                {error && <Alert msg={error}/>}
            </form>
        </div>
        </div>
        </>
        }   
    </>
    )
}

export default CreatePost