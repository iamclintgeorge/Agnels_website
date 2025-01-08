import axios from "axios"

const HomePage = () => {
  const res = async () => await axios.get("http://localhost:3663/", {
    withCredentials: true,
  });
  console.log("HomePage", res);

  return (
    <>
    <div className="bg-[#0C2340] h-screen w-64 text-white">Soli Deo Gloria </div>
    </>
  )
}

export default HomePage
