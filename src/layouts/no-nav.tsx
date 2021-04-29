import React, { useState } from "react"
import PropTypes from "prop-types"
import Index from "./index"

const Layout: React.FC = (props) => {
  console.log("no-nav")
  return <Index {...props} hideNav />
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
