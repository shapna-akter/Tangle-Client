import React from "react";
import Banner from "../Banner/Banner";
import Support from "../Support/Support";
import logo1 from "../../../../assets/brandLogo.png";
import logo2 from "../../../../assets/tangleLogo.png";

const Home = () => {
  return (
    <div>
      {/* <div className="flex justify-center items-center p-3 text-xl">
        <img src={logo1} alt="brandLogo" className="h-8" />
        <img src={logo2} alt="tangleLogo" className="h-6" />
      </div> */}
      <Banner></Banner>
      <Support></Support>
    </div>
  );
};

export default Home;
