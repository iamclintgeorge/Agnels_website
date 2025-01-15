import axios from "axios"
import useAuthCheck from "../services/useAuthCheck"

const HomePage = () => {
const {loading, message, isAuthenticated} = useAuthCheck();
if (loading)
{
  return <div>Loading...</div>;
}

  return (
    <>
    {isAuthenticated ? (<div className="bg-[#0C2340] h-screen w-64 text-white">Soli Deo Gloria </div> ) : (<p>{message}</p>)}
    </>
  )
}

export default HomePage
