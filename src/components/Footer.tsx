import React from "react";

const Instagram = require("../images/icons/instagram.webp");
const Youtube = require("../images/icons/youtube.webp");
const Facebook = require("../images/icons/facebook.webp");

export default (props): React.ReactElement => {
  return (
    <div className="grid grid-flow-col md:grid-flow-col text-loud-yellow bg-black px-16 py-8 justify-between">
      <div className="text-sm leading-relaxed">
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
      <div className="grid grid-flow-row md:grid-flow-col gap-4 my-auto">
        <img src={Instagram} className="w-12" />
        <img src={Youtube} className="w-12" />
        <img src={Facebook} className="w-12" />
      </div>
    </div>
  );
};
