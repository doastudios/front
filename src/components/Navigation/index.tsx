import React, { useContext, useState } from "react"
import styled, { CSSObject } from "@emotion/styled"
import reduce from "lodash/reduce"
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

  const containerClasses = scrolled
    ? "grid grid-cols-3 lg:flex lg:flex-row fixed w-full z-50 left-0 top-0 "
    : "lg:flex lg:flex-col shadow-lg sticky top-0"

  const imageClasses = scrolled ? "px-4 my-auto" : "my-6"
  const MenuItem = styled.li`
    margin-top: auto;
    margin-bottom: auto;
  `

  const [showMenu, setShowMenu] = useState(false)

  const menuClasses = showMenu ? "" : "hidden lg:grid"

  return (
    <Wrapper
      className={
        containerClasses +
        " p-2 m-0 col-span-12 justify-items-center baseline lg:px-32 cursor-pointer"
      }
    >
      <button onClick={() => setShowMenu(!showMenu)} className="flex">
        <GiHamburgerMenu
          className={"lg:hidden w-12 h-12 cursor-pointer my-auto"}
        />
      </button>
      <motion.div layout transition={{ duration: 0.1 }}>
        <div className={"flex " + imageClasses}>
          <img src={DoaCarton} className="w-32 mx-auto my-auto" />
        </div>
      </motion.div>
      {/* Push menu into middle column on mobile*/}
      <div className={`lg:hidden`} />
      <div className={`lg:hidden`} />
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className={"w-full pb-4 mt-8 col-span-2 " + menuClasses}
      >
        <ul
          className={
            "justify-between h-full pb-4 uppercase text-md grid grid-flow-row lg:grid-flow-col bold lg:space-x-2 "
          }
        >
          <MenuItem>
            <a href="/magazine">magazine</a>
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
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
