import React, { ReactElement, useState } from "react"
import { motion } from "framer-motion"
import useScrollPosition from "../cross/hooks/useScrollPosition"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Popup from "../components/Popup"

interface Props {}

const HowWouldYouRateYourExperience = require("../images/home/HowWouldYouRateYourExperience.png")
const Starfield = require("../images/home/starfield.png")

function Index(_props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const scrollPosition = useScrollPosition()

  const StarfieldContainer = styled.div`
    margin-top: -100%;
  `

  const [popups, setPopups] = useState([
    {
      title: "2020 Calendar Year",
      body: "How would you rate your experience?",
      x: 150,
      y: 230,
    },
    {
      title: "2020 Calendar Year",
      body: "How would you rate your experience?",
      x: 150,
      y: 230,
    },
  ])

  return (
    <div className="container overflow-hidden full-bleed ">
      <img className="w-full v-screen" src={HowWouldYouRateYourExperience} />
      {popups.map((popup) => {
        return <Popup {...popup} />
      })}

      <motion.div layout animate={{ y: 0.5 * -scrollPosition }}>
        <div
          className={
            "h-screen " +
            css`
              background-image: linear-gradient(
                  to left,
                  rgba(0, 0, 0, 0) 0%,
                  rgba(0, 0, 0, 0) 22%,
                  rgba(0, 0, 0, 0.65) 100%
                ),
                url(${Starfield});
            `
          }
        ></div>
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
