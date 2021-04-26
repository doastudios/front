import React, { ReactElement, useState } from "react"
import { motion } from "framer-motion"
import useScrollPosition from "../cross/hooks/useScrollPosition"
import { css, jsx } from "@emotion/react"
import styled from "@emotion/styled"
import Popup from "../components/Popup"
import { MultiTicker } from "../components/Ticker"

interface Props {}

const HighlyBelowAvg = require("../images/home/HighlyBelowAvg.png")
const Starfield = require("../images/home/stars.png")
const MomsGarage = require("../images/home/MomsGarage.png")
const DontMindIfIDont = require("../images/home/DontMindIfIDont.png")
const FuturePhonk = require("../images/home/FuturePhonk.png")
const TropicalHotel = require("../images/home/TropicalHotel.jpg")
const AlligatorMemories = require("../images/home/AlligatorMemories.png")
const MadStylinDeadAssEyeContact = require("../images/home/MadStylinDeadAssEyeContact.jpg")

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
    <>
      <div className="grid grid-flow-row">
        <img className="w-full v-screen full-bleed" src={HighlyBelowAvg} />
        <img className="w-full v-screen full-bleed" src={Starfield} />
        <div className="-mt-full-screen">
          <div className="grid">
            <img className="h-32 my-3 border border-blau" src={MomsGarage} />
            <img
              className="h-32 my-3 border border-blau"
              src={DontMindIfIDont}
            />
            <img className="h-32 my-3 border border-blau" src={FuturePhonk} />
            <img
              className="h-32 my-3 border border-blau"
              src={AlligatorMemories}
            />
          </div>
        </div>
        <img className="w-full v-screen full-bleed" src={TropicalHotel} />

        <div>
          <MultiTicker count={5} text="IRL MEETS URL" />
        </div>
        <div className="w-full -mt-50 grid grid-cols-2">
          <img className="z-10 col-start-2" src={MadStylinDeadAssEyeContact} />
        </div>
        <div className="-mt-20 pt-80 bg-simpson full-bleed grid grid-cols-9 px-36 pb-36 ">
          <div className="col-start-4 col-span-6">
            <h1 className="pr-16 text-5xl italic font-semibold tracking-widest text-right uppercase text-loud-yellow">
              Subscribe to our newsletter
            </h1>
            <div className="flex flex-row justify-end pr-1 pr-16 mt-6">
              <button className="px-6 py-2 bg-loud-yellow text-simpson">
                email address
              </button>
              <button className="px-6 py-2 bg-white text-simpson ">
                sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      {popups.map((popup) => {
        return <Popup {...popup} />
      })}
    </>
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
