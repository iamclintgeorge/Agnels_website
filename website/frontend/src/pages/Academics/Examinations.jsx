import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Examinations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/examinations-page", { replace: true }); // ✅ Redirects correctly
  }, [navigate]);

  return null; // No need to render anything since it redirects
};

export default Examinations;
