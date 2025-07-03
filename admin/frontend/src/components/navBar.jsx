import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../services/useAuthCheck";
import SearchBar from "./searchBar";

const NavBar = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    setIsUserOpen((prevstate) => !prevstate);
  };

  const handleSignout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/signout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Successfully Logged Out");
      navigate("/login");
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="z-10 fixed w-full">
        <div className="bg-[#AE9142] h-[3px] w-full top-0"></div>
        <div className="bg-[#0C2340] h-16 w-full top-[3px] bottom-0 border-b-[0.5px] border-[#888888]">
          <div className="flex flex-row justify-between">
            <Link to="/">
              {" "}
              <div className="pl-9 pt-3 text-white">
                <p className="font-playfair text-[13px] font-[350] tracking-[0.5px] leading-6">
                  FR. CONCEICAO RODRIGUES
                </p>
                <p className="font-playfair font-thin text-[9px] tracking-[2.7px]">
                  INSTITUTE OF TECHNOLOGY
                </p>
              </div>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="text-white flex flex-row text-sm pr-10">
              <p
                className="cursor-pointer mr-5 pt-[22px] font-light font-inter"
                onClick={handleUserClick}
              >
                {/* {user.userName} */}
                {/* Gautam Tiwari Chowdhary */}
                Undefined
              </p>
              <div className="relative inline-block">
                <button
                  className="text-xs pt-6 pb-5 pr-6"
                  onClick={handleUserClick}
                >
                  &#9660;
                </button>

                {isUserOpen && (
                  <div className="absolute left-16 transform -translate-x-full py-4 px-5 space-y-4 bg-[#0C2340] text-nowrap">
                    <Link to="/profile">
                      <p>Edit Profile</p>
                    </Link>

                    {(user.role === "hod" || user.role === "superAdmin") && (
                      <Link to="/hoddesk">
                        <p className="mt-5">HOD's Desk</p>
                      </Link>
                    )}

                    {(user.role === "principal" ||
                      user.role === "superAdmin") && (
                      <Link to="/principaldesk">
                        <p className="mt-5">Principal's Desk</p>
                      </Link>
                    )}

                    <Link to="/login">
                      <p className="mt-5">Switch User</p>
                    </Link>

                    <button onClick={handleSignout}>Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
