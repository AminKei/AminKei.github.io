import React, { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
import Waves from "./FooterWas/Waves";
export const Home: React.FC = () => {
  const [countryName, setCountryName] = useState("");

  const navigate = useLocation();

  const getCuntryName = async (e: FormEvent) => {
    e.preventDefault();
    document.location = `/details/${countryName}`;
  };

  return (
    <div className="root-div-home">
      <div className="sun">sun</div>

      <div>
        <h1 className="text-center">Weather App</h1>

        <input
          id="outlined-basic"
          value={countryName}
          placeholder="Enter country Name"
          data-testid="inputbox-test-id"
          onChange={(e) => setCountryName(e.target.value)}
        />
      </div>
      <button
        className="btn-submit"
        data-testid="button-testid"
        aria-disabled={countryName === ""}
        onClick={getCuntryName}
      >
        Submit
      </button>
      <Waves />
    </div>
  );
};
