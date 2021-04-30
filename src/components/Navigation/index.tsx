import React, { useContext, useState } from "react"
import styled, { CSSObject } from "@emotion/styled"
import reduce from "lodash/reduce"
import { AnimateSharedLayout } from "framer-motion"
import { GiHamburgerMenu } from "react-icons/gi"
import PropTypes from "prop-types"
import DoaCarton from "../../images/doa_carton.png"

import { motion, motionValue, useTransform } from "framer-motion"

import StoreContext from "../../features/store/context/StoreContext"
import { CartCounter, Container, MenuLink, Wrapper } from "./styles"
import useScrollPosition from "../../cross/hooks/useScrollPosition"

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

// eslint-disable-next-line no-empty-pattern
const Navigation = ({ scrolled }: { siteTitle: string; scrolled: boolean }) => {
  const [hasItems, quantity] = useQuantity()
  const scrollPosition = useScrollPosition()
  const height = useTransform(
    motionValue(scrollPosition),
    [0, -52, -52],
    [140, 88, 88],
    {
      clamp: false,
    }
  )

  const containerClasses = "grid grid-cols-3  fixed w-full z-50 left-0 top-0 "

  const imageClasses = "px-4 my-auto"
  const MenuItem = styled.li`
    margin-top: auto;
    margin-bottom: auto;
  `

  const [showMenu, setShowMenu] = useState(false)

  const menuClasses = showMenu ? "" : "hidden"

  return (
    <AnimateSharedLayout>
      <Wrapper
        className={
          containerClasses +
          " p-2 m-0 col-span-12 justify-items-center baseline  cursor-pointer"
        }
      >
        <div className="flex flex-row">
          <motion.div
            animate={{
              scale: [0.2, 0.3, 1.2, 0.9, 0.95],
              rotate: [0, 0, -45, 45, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeatDelay: 1,
            }}
            className="col-start-1"
          >
            <div className={"flex " + imageClasses}>
              <img src={DoaCarton} className="w-16 mx-auto my-auto" />
            </div>
          </motion.div>

          <h1 className="my-auto text-3xl font-extrabold tracking-widest uppercase">
            Dead on Arrival
          </h1>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex ml-auto col-start-3 md:mr-4"
        >
          <GiHamburgerMenu className={" w-12 h-12 cursor-pointer my-auto"} />
        </button>
        {/* Push menu into middle column on mobile*/}
        <div className={``} />
        <div className={``} />
        <motion.div
          layout
          animate={{ opacity: 100 }}
          transition={{ duration: 0.05, type: "spring", stiffness: 100 }}
          className={"w-full pb-4 mt-8 col-span-2 " + menuClasses}
          layoutId="menu"
        >
          <ul
            className={
              "text-4xl ml-16 mt-2  justify-between h-full pb-4 uppercase text-md grid grid-flow-row  bold  mx-auto "
            }
          >
            <MenuItem>
              <a href="/magazine">magazine</a>
            </MenuItem>
            <MenuItem>
              <a href="/articles">articles</a>
            </MenuItem>
            <MenuItem>
              <a href="/blog">blog</a>
            </MenuItem>
            <MenuItem>
              <a href="/shop">shop</a>
            </MenuItem>
            <MenuItem>
              <a href="/about">about</a>
            </MenuItem>
            <MenuItem>
              <a href="/contact">contact</a>
            </MenuItem>
            <MenuItem>
              <a href="/subscribe">subscribe</a>
            </MenuItem>
            <MenuItem>
              <span className="text-red-400">
                <a href="/cart">cart</a>
              </span>
            </MenuItem>
          </ul>
        </motion.div>
      </Wrapper>
    </AnimateSharedLayout>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
