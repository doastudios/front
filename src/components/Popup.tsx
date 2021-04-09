import React, { useState } from "react"
import PropTypes from "prop-types"
import { AiOutlineCloseSquare } from "react-icons/ai"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

export const Popup = ({ title, body, x, y }) => {
  return (
    <div
      className={`mx-32 text-4xl absolute top-${y} left-${x} bg-blau border border-8 border-blau`}
    >
      <div className="flex justify-between px-8 py-6 text-white">
        {title}
        <AiOutlineCloseSquare />
      </div>
      <div className="w-full px-48 py-24 text-4xl leading-relaxed bg-white text-blau">
        {body}
      </div>
    </div>
  )
}

Popup.defaultProps = {}

Popup.propTypes = {}

export default Popup
