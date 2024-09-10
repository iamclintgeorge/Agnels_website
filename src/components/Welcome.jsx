import React from "react";
import "../styles/Welcome.css";

const Welcome = () => {
  return (
    <div className="flex p-8">
      {/* Left side for Welcome Text */}
      <div className="w-1/2 pr-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Fr. C. Rodrigues Institute of Technology
        </h2>
        <p className="text-lg mb-4">A college with a difference!!</p>
        <p className="text-base mb-2">
          Fr. CRIT. has, within a short span of time, established itself as a
          leading engineering college in Mumbai University. Though its
          reputation rests mainly on the high quality, value-based technical
          education that it imparts, it has to its credit a verdant,
          well-maintained Campus and extensive facilities. Its location in the
          vicinity of the holy places of various religious denominations
          underscores its secular credentials and its philosophy of "Vasudhaiva
          Kuttumbakam".
        </p>
      </div>

      {/* Right side for Announcements */}
      <div className="w-1/2 pl-4">
        <Announcements />
      </div>
    </div>
  );
};

const Announcements = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 bg-gray-200 p-4 rounded-md shadow-md">
        Announcements
      </h2>
      <div className="vertical-marquee-container border-4 flex justify-center text-center">
        <ul className="list-none vertical-marquee">
          <li className="mb-2">
            <span className="font-semibold">
              Fronius India Solution and Skill Centre
            </span>
          </li>
          <br />
          <br />
          <li className="mb-2">
            <span className="font-semibold text-red-500">NEW</span> IEI NMLC -
            FCRIT EXCELLENCE AWARDS 2024
          </li>
          <br />
          <br />
          <li className="mb-2">
            <span className="font-semibold">
              Higher Semester Fee Circular 2024-25
            </span>
          </li>
          <br />
          <br />
          <li className="mb-2">
            <span className="font-semibold">
              Higher Semester Registration Form 2024-25
            </span>
          </li>
          <br />
          <br />
          <li className="mb-2">
            <span className="font-semibold">Incentive to faculty members</span>
          </li>
          <br />
          <br />
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
