import React, { ReactElement, useState } from "react"
import { motion } from "framer-motion"
import useScrollPosition from "../cross/hooks/useScrollPosition"
import Layout from "../layouts/"
import { css, jsx } from "@emotion/react"
import styled from "@emotion/styled"
import Popup from "../components/Popup"
import { MultiTicker } from "../components/Ticker"

interface Props {}

const HighlyBelowAvg = require("../images/home/HighlyBelowAvg.png")
const Starfield = require("../images/home/stars.png")
const SneakAPeak = require("../images/home/SneakAPeak.png")
const MomsGarage = require("../images/home/MomsGarage.png")
const MomsGarageText = require("../images/home/MomsGarageText.png")
const DontMindIfIDont = require("../images/home/DontMindIfIDont.png")
const SometimesIWish = require("../images/home/SometimesIWish.png")
const FuturePhonk = require("../images/home/FuturePhonk.png")
const FuturePhonk2021 = require("../images/home/FuturePhonk2021.png")
const TropicalHotel = require("../images/home/TropicalHotel.jpg")
const AlligatorMemories = require("../images/home/AlligatorMemories.png")
const MadStylinDeadAssEyeContact = require("../images/home/MadStylinDeadAssEyeContact.jpg")

const insta = require("../images/home/insta.png")
const yt = require("../images/home/yt.png")
const linkTree = require("../images/home/linkTree.png")

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
    <Layout>
      {popups.map((popup) => {
        return <Popup {...popup} />
      })}
      <div className="grid grid-flow-row">
        <div
          className="w-full h-screen full-bleed grid grid-cols-2 grid-rows-2 px-8 py-8"
          style={{ backgroundImage: `url(${HighlyBelowAvg})` }}
        >
          <img src={SneakAPeak} className="md:row-start-2 md:col-start-2" />
        </div>
        <img className="w-full h-screen full-bleed" src={Starfield} />
        <div className="z-10 -mt-full-screen">
          <div className="grid">
            <div
              className="bg-cover h-32 my-3 border border-blau flex flex-col text-white w-full"
              style={{ backgroundImage: `url(${MomsGarage})` }}
            >
              <img className="mx-auto my-auto" src={MomsGarageText} />
              <h2 className="mx-auto mb-3 text-lg text-boldest">
                Follow our Garage and Surf Rock playlist on Spotify
              </h2>
            </div>
            <div
              className="bg-cover h-32 my-3 border border-blau w-full "
              style={{ backgroundImage: `url(${FuturePhonk})` }}
            ></div>
            <div
              className="bg-cover h-32 my-3 border border-blau w-full grid grid-cols-3"
              style={{ backgroundImage: `url(${DontMindIfIDont})` }}
            >
              <div className="my-auto col-start-1 mx-8 my-4">
                <img src={FuturePhonk2021} />
              </div>
              <div className="font-boldest text-3xl text-white text-center uppercase my-auto">
                See Our Favorite Mixes of the Year
              </div>
              <div className="my-auto col-start-3 mx-8 my-4">
                <img src={FuturePhonk2021} />
              </div>
            </div>
            <div
              className="bg-cover h-32 my-3 border border-blau w-full font-baskerville flex flex-col py-4 text-hurt-ur-eyes"
              style={{ backgroundImage: `url(${AlligatorMemories})` }}
            >
              <h2 className="text-3xl uppercase  mx-auto my-auto">
                Memoirs of the Alligator
              </h2>
              <h3 className="mx-auto my-auto">
                A Brief of Reptiles <br /> by Max Matson
              </h3>
            </div>
          </div>
        </div>
        <img className="w-full h-screen full-bleed" src={TropicalHotel} />
        <div className="text-boldest">
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
        <div
          className="grid grid-cols-3 grid-rows-6 h-screen full-bleed bg-cover"
          style={{ backgroundImage: `url(${SometimesIWish})` }}
        >
          <div className="row-start-4 l-start-1 grid grid-flow-col gap-4 px-6">
            <div>
              <img src={insta} />
            </div>
            <div>
              <img src={linkTree} />
            </div>
            <div>
              <img src={yt} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
