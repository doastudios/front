import React from "react";

const Instagram = require("../images/icons/instagram.webp");
const Youtube = require("../images/icons/youtube.webp");
const Facebook = require("../images/icons/facebook.webp");

export default (props): React.ReactElement => {
  return (
    <div className="grid grid-flow-row md:grid-flow-col text-loud-yellow bg-black px-16 py-8 justify-between font-ocrastd text-xs h-full">
      <div className="text-xs lg:text-lg leading-loose row-start-2 md:row-start-1 text-center md:text-left pt-16 md:pt-0 md:my-auto">
        <ul>
          <li>
            <a href="/about" className="underline">
              About
            </a>
          </li>
          <li>
            <a href="/pp" className="underline">
              Privacy Policy
            </a>
          </li>
          <li>© Dead On Arrival Magazine 2021</li>
        </ul>
      </div>
      <div className="grid grid-flow-col gap-4 my-auto mx-auto">
        <img src={Instagram} className="w-12" />
        <img src={Youtube} className="w-12" />
        <img src={Facebook} className="w-12" />
      </div>
    </div>
  );
};
