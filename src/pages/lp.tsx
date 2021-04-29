import React, { ReactElement, useState } from "react"
import { motion } from "framer-motion"
import useScrollPosition from "../cross/hooks/useScrollPosition"
import { css, jsx } from "@emotion/react"
import styled from "@emotion/styled"
import Popup from "../components/Popup"
import { MultiTicker } from "../components/Ticker"
import Ticker from "react-ticker"

interface Props {}

const DoaComputer = require("../images/DoaComputer.png")
const DoaCartonBordered = require("../images/DoaCartonBordered.png")

function Index(_props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const scrollPosition = useScrollPosition()

  const StarfieldContainer = styled.div`
    margin-top: -100%;
  `

  const [email, setEmail] = useState("")
  const submitEmail = (e) => {
    console.log(e)
    setEmail(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <div className="min-h-screen grid grid-flow-row">
        <div className="flex flex-col bg-cyan full-bleed">
          <div className="mt-1">
            <div className="h-8 text-2xl text-white">
              <Ticker speed={2} mode={"chain"} direction={"toLeft"}>
                {() => <h1 className="px-1"> DOA MAGAZINE </h1>}
              </Ticker>
            </div>
          </div>
          <div className="py-8 col-start-4 col-span-6">
            <h1 className="pr-16 text-5xl italic font-semibold tracking-widest text-right uppercase"></h1>
            <div className="w-64 mx-auto">
              <img className="mx-auto" src={DoaComputer} />
            </div>
          </div>
          <div className="h-8 text-2xl text-white">
            <Ticker speed={2} mode={"chain"} direction={"toRight"}>
              {() => <h1 className="px-1"> DOA MAGAZINE </h1>}
            </Ticker>
          </div>
          <div className="flex flex-col px-4 py-8 pt-16 mt-auto font-extrabold text-white bg-black lg:grid lg:grid-cols-2 full-bleed md:px-28 ">
            <div className="flex flex-col text-center">
              <p>
                Be the first to receive can’t-miss offers and discounts, updates
                on our magazine launch, plus get access to the most exclusive
                DOA content by signing up for our newsletter.
              </p>
              <form name="newsletter" netlify data-netlify="true" method="POST">
                <div className="flex flex-row w-full px-8 mt-6">
                  <button
                    type="submit"
                    className="z-10 px-8 py-3 font-semibold uppercase bg-cyan rounded-md"
                  >
                    EMAIL
                  </button>
                  <input
                    className="w-full pl-6 -ml-4 text-black rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="w-48 mx-auto md:mx-0 md:ml-auto">
              <img src={DoaCartonBordered} className="mx-auto my-auto invert" />
            </div>
            <div className="pb-3 mt-2 text-sm text-center col-span-2">
              <a href="/pp">Privacy Policy</a>
              <span> | </span>
              <a href="/contactUs" className="">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
