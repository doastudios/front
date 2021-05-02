import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export const Popup = ({ title, body, x, y }) => {
  return (
    <div
      className={`z-20 mx-4 md:mx-32 text-lg md:text-4xl absolute bg-blau border border-8 border-blau`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <div className="flex justify-between px-8 py-6 text-white">
        {title}
        <AiOutlineCloseSquare />
      </div>
      <div className="w-full md:px-48 md:py-24 text-4xl leading-relaxed bg-white text-blau">
        {body}
      </div>
    </div>
  );
};

Popup.defaultProps = {};

Popup.propTypes = {};

export default Popup;
