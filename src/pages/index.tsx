import React, { ReactElement, useState } from "react"
import { motion } from "framer-motion"
import useScrollPosition from "../cross/hooks/useScrollPosition"
import styled from "@emotion/styled"

interface Props {}

const HowWouldYouRateYourExperience = require("../images/home/HowWouldYouRateYourExperience.png")
const Starfield = require("../images/home/starfield.png")

function Index(_props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const scrollPosition = useScrollPosition()

  const StarfieldContainer = styled.div`
    margin-top: -100%;
  `

  return (
    <div className="container overflow-hidden full-bleed ">
      <img className="w-full v-screen" src={HowWouldYouRateYourExperience} />
      <motion.div layout animate={{ y: 0.5 * -scrollPosition }}>
        <img src={Starfield} className="w-screen h-screen" />
      </motion.div>
    </div>
  )
}

export default Index

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "corgi.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
