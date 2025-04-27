import React from "react";
import kubetools from "../assets/Tools.png";
import Button from "./Button";
function Hero() {
  return (
    <div className="bg-bgPrimary w-full px-6 py-6  max-w-4xl mx-auto">
      <div className="flex flex-col  items-center gap-6 p-5 md:p-8 rounded-xl bg-bgGray">
        <div>
          <img src={kubetools} alt="" className="md:w3/4 rounded-xl" />
        </div>
        <div>
          <div>
            <h1 className="text-primary text-[28px] md:text-4xl ">
              Ultimate Kubenetes & CloudNative Toolkits
            </h1>
            <h3 className="text-grayFill md:text-xl">
              Submit Your Favourite Open Source Tool
            </h3>
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-4">
              <Button text={"Submit Tool"} link={"https://forms.gle/oEnLicsNtsdpRRHN8"} />
              <Button text={"Github"} link={"https://github.com/sangam14/Kubernetes-CloudNative-Toolkits"} />
              <Button
                text={"Join Us on Discord"}
                link={"https://discord.com/invite/rEvr7vq"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
