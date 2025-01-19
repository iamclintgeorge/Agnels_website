import axios from "axios"
import useAuthCheck from "../services/useAuthCheck"
import SideAndNavBar from "../components/sideAndNavBar"

const HomePage = () => {
// const {loading, message, isAuthenticated} = useAuthCheck();
// if (loading)
// {
//   return <div>Loading...</div>;
// }

  return (
    // <>
    // {isAuthenticated ? (<div className="bg-[#0C2340] h-screen w-64 text-white">Soli Deo Gloria </div> ) : (<p>{message}</p>)}
    // </>
    <>
    <SideAndNavBar />
    <div className="text-black">Soli Deo Gloria </div>
    </>
  )
}

export default HomePage
