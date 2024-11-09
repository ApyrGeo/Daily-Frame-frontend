/* eslint-disable react/prop-types */
//import { Container, Grow, Grid} from "@material-ui/core";
import Posts from "../components/Posts"
import MainHeader from "../components/Header";
import Message from "../components/Message";


const Homepage = ({isGuest, isPersonal}) => {

    return (
        <>
        <MainHeader isGuest={isGuest} isPersonal={isPersonal}/>
        {localStorage.getItem("name") && <div className="mt-14"><Message message={`Logged in as: ${localStorage.getItem("name")}`}/></div> }
        <Posts isGuest={isGuest} isPersonal={isPersonal}/>

        </>
    )
}
export default Homepage;