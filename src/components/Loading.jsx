/* eslint-disable react/prop-types */
import { CircularProgress, Typography } from "@material-ui/core"

const Loading =({posting})=>{

    const generateMessage = () =>{
        if(posting) return "Uploading your post..."

        const option = Math.floor(Math.random() * 6);
        switch(option){
            case 0:
                return "Getting posts. This might take a while";
            case 1:
                return "Just a sec...";
            case 2:
                return "Loading posts. This shouldn`t take long";
            case 3:
            case 4:
            case 5:
                return "Loading...";
            default: return ""
        }
    }

    return (
        <div className="flex flex-col justify-center text-center bg-blue-950 bg-opacity-75" style={{paddingBottom: "200%", paddingTop: "20%"}}>
            <div>
                <CircularProgress />
            </div>
            <Typography className="text-4xl mt-3 text-blue-300">{generateMessage()}</Typography>
        </div>
    )
}

export default Loading