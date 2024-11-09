/* eslint-disable react/prop-types */


const Message = ({message}) =>{
    return (
        <div className="text-center text-2xl text-cyan-100 h-full bg-gradient-to-r from-blue-700  via-blue-950 to-blue-700 bg-opacity-70 p-3 pr-10" >
            {message}
        </div>
    )
}

export default Message