/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
//import React from "react";
import { Card, CardActions, CardMedia, Button, Typography, CircularProgress } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
//import EditIcon from '@material-ui/icons/Edit';
import moment from "moment"
import { checkUserLiked, deletePost, likePost } from "../controllers/postsController";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/postContext";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";


const Post = ( { isGuest, post, isPersonal, setPendingDelete } ) =>{

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const {posts, setPosts} = useContext(PostContext);
    const [likes, setLikes] = useState(post.likeCount.length);
    const [liked, setLiked] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() =>{
        if(isGuest) return;
        const getData = async()=>{
            const {liked} = await checkUserLiked(post._id);
            setLiked(liked);
            setLoaded(true);
        }
        getData();

    },[]);

    const checkImage = (file) =>{

        let extension = file?.split(':')[1]?.split('/')[0];

        //console.log(extension);
        if(extension === "image") return true;

        return false;
    }

    const handleLike = async()=>{
        
        try{
            liked ? setLikes(likes - 1) : setLikes(likes + 1);
            setLiked(!liked);
            await likePost(post._id);
            //setLikes(updatedPost.likeCount.length);
            //setLiked(hasLiked);

        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async()=> {
        try{
            setPendingDelete(true);
            await deletePost(post._id);
            
            const newPosts = posts.filter((pst) => pst._id !== post._id);
            setPosts(newPosts);

            const newUserPosts = user.posts.filter((pst) => pst._id !== post._id);
            setUser({...user, posts: newUserPosts});

            setPendingDelete(false);
            navigate("/dashboard/posts")

        }catch(err){
            console.log(err);
        }
    }
    if(loaded || isGuest)
    return (
    <>
      <Card style={{backgroundColor: "rgb(23 37 84)", border: "solid 4px rgb(147 197 253)", borderRadius: "10px"}}>
        {
            checkImage(post.selectedFile) ? 
            <CardMedia className="py-32 text-blue-300" component="image" image={post.selectedFile} title={post.title}/> :
            <CardMedia  component="video" controls image={post.selectedFile} title={post.title}/>
        }
                
                <div className="overlay ml-5 mr-5 mt-2">
                <Typography className="text-blue-300" variant="h6" >{post.creator}</Typography>
                <Typography className="text-blue-300" variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
                </div>
                
                <div className="ml-5 mr-5 mt-10">
                <Typography className="text-cyan-100" variant="h5" gutterBottom>{post.title}</Typography>
                <Typography className="text-cyan-100" component="p" variant="body2">{post.message}</Typography>
                </div>
                <div className="ml-5 mr-5 mt-3">
                <Typography className="text-cyan-100" variant="body2" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardActions className="ml-3 cyan-100">
            {isGuest ? 
                <Button disabled size="small" style={{color: "rgb(147 197 253)",  outline: "solid 1px rgb(207 250 254)"}} >
                Likes
                {" : "}
                {likes}
                </Button>: 
                (liked?
                    <Button onClick={handleLike} size="small" style={{color: "rgb(147 197 253)",  outline: "solid 1px rgb(207 250 254)"}} >
                    <ThumbUpAltIcon fontSize="small" className="mr-3" style={{color: "rgb(207 250 254)"}}/>
                    Liked
                    {" : "}
                    {likes}
                    </Button>:
                    <Button onClick={handleLike} size="small" style={{color: "rgb(147 197 253)",  outline: "solid 1px rgb(207 250 254)"}} >
                    <ThumbUpAltIcon fontSize="small" className="mr-3" style={{color: "rgb(147 197 253)"}}/>
                    Like
                    {" : "}
                    {likes}
                    </Button>
                )}
            {isPersonal &&
                <Button onClick={handleDelete} size="small" style={{color: "rgb(147 197 253)", outline: "solid 1px rgb(207 250 254)"}}>
                <DeleteIcon fontSize="small" />
                Delete
                </Button>
            }
            </CardActions>
        </Card>
    </>  
    )
    else
    return (
        <Card className="flex flex-col items-center py-16" style={{backgroundColor: "rgb(23 37 84)", border: "solid 4px rgb(147 197 253)", borderRadius: "10px"}}>
            <div>
                <CircularProgress />
            </div>
        </Card>
    )
}

export default Post;