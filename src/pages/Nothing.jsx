import MainHeader from "../components/Header"

const Nothing = () => {
    return (
    <>
        <MainHeader isGuest={true} />
        <div className="mt-20 flex flex-col items-center">
            <div className="mt-10 bg-blue-950 rounded-2xl px-5 ring-blue-300 ring-2 flex flex-col items-center">
            <h3 className="text-center text-cyan-100 text-3xl my-5">This page does not exist!</h3>
            </div>
        </div>
    </>
    )
}

export default Nothing