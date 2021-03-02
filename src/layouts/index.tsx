import React, { useState } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Waypoint } from "react-waypoint"
import styled from "@emotion/styled"

import ContextProvider from "../features/store/provider/ContextProvider"

import { GlobalStyle } from "../utils/styles"
import Navigation from "../components/Navigation"

const Layout: React.FC = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)
  const waypointEnter = () => setScrolled(true)
  const waypointLeave = () => setScrolled(false)

  const WaypointContainer = styled.div`
    // TODO remove Frame
    width: 5px;
    height: 5px;
    border: 1px solid red;
    // Frame

    position: absolute;
    z-index: -100;
    left: 100vw;
    top: 100vh;
  `

  return (
    <ContextProvider>
      <GlobalStyle />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data) => (
          <div class="grid grid-cols-12 h-screen bg-gray-100">
            <div className="row-auto col-span-12">
              <Navigation
                siteTitle={data.site.siteMetadata.title}
                scrolled={scrolled}
              />
            </div>

            <WaypointContainer>
              <Waypoint onEnter={waypointEnter} onLeave={waypointLeave} />
            </WaypointContainer>
            <div className="col-span-2"></div>
            <div className="col-span-8">{children}</div>
            <div className="col-span-2"></div>
          </div>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
