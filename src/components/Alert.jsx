/* eslint-disable react/prop-types */

const Alert = ({msg}) =>{

    return(
    <div className="w-full rounded-md p-2 outline-0 border-0 mb-10 ring-blue-300 bg-red-700">
        <h1 className="text-red-300">
            {msg}        
       </h1>
    </div>)
}

export default Alert