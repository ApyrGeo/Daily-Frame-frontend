/* eslint-disable react/prop-types */
import { Container, Grid, Grow } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { getPosts, getUserPosts } from "../controllers/postsController";
import { PostContext } from "../contexts/postContext";
import Post from "./Post";
import { UserContext } from "../contexts/userContext";
import Loading from "./Loading";
import Message from "./Message";

const Posts = ({isGuest, isPersonal}) =>{

    const [pendingDelete, setPendingDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const {user, setUser} = useContext(UserContext);
    const {posts, setPosts} = useContext(PostContext);

    
    useEffect(() => {
    setTimeout(async () => { 

        const data1 = await getPosts();
        setPosts(data1);
        
        if(!isGuest)
        {
            const data2 = await getUserPosts();
            setUser({...user, posts: data2})
        }
        setLoading(false);

    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        {loading ? <Loading className="w-full h-full" /> :
        <>
        {pendingDelete && <Message message="Post is being deleted..."/> }
        <Container maxWidth="lg" className="mt-10">
            <Grow in>
                <Container >
                    <Grid container justify-content="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12}>
                            <Grid style={{marginTop: "10px"}} container alignItems="stretch" spacing="6">
                                {isPersonal?
                                    user.posts.map((post) => (
                                        <Grid key={post._id} item xs={12} sm={4} className="w-full">
                                            <Post isGuest={isGuest} post={post} isPersonal={isPersonal} setPendingDelete={setPendingDelete}/>
                                        </Grid>
                                    ))
                                    
                                :
                                    posts.map((post) => (
                                        <Grid key={post._id} item xs={12} sm={4} className="w-full">
                                            <Post isGuest={isGuest} post={post} isPersonal={isPersonal}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>    
            </Grow >
        </Container>       
        </>
        }
        </>
        );
}

export default Posts