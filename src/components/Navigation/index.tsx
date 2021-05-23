import React, { useContext, useState } from "react";
import styled, { CSSObject } from "@emotion/styled";
import reduce from "lodash/reduce";
import { AnimateSharedLayout } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from "prop-types";
import Img, { FixedObject, FluidObject, GatsbyImageProps } from "gatsby-image";
import { Logo } from "../svg/logo";
import { useStaticQuery, graphql } from "gatsby";

import { motion, motionValue, useTransform } from "framer-motion";

import StoreContext from "../../features/store/context/StoreContext";
import { CartCounter, Container, MenuLink, Wrapper } from "./styles";
import useScrollPosition from "../../cross/hooks/useScrollPosition";

const useQuantity = () => {
  const {
    store: { checkout },
  }: any = useContext(StoreContext);
  const items = checkout ? checkout.lineItems : [];
  const total = reduce(items, (acc, item) => acc + item.quantity, 0);
  return [total !== 0, total];
};

// eslint-disable-next-line no-empty-pattern
const Navigation = ({ scrolled }: { siteTitle: string; scrolled: boolean }) => {
  const [hasItems, quantity] = useQuantity();
  const scrollPosition = useScrollPosition();
  const height = useTransform(
    motionValue(scrollPosition),
    [0, -52, -52],
    [140, 88, 88],
    {
      clamp: false,
    }
  );

  const containerClasses = "grid grid-cols-3  fixed w-full z-50 left-0 top-0 ";

  interface Data {
    logo: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  }

  const data: Data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "doa_carton.png" }) {
        childImageSharp {
          fluid(maxWidth: 793, maxHeight: 900, quality: 100, webpQuality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const MenuItem = styled.li`
    margin-top: auto;
    margin-bottom: auto;
  `;

  const [showMenu, setShowMenu] = useState(false);

  const menuClasses = showMenu ? "" : "hidden lg:block";

  return (
    <AnimateSharedLayout>
      <Wrapper
        className={
          containerClasses +
          " p-2 m-0 col-span-12 justify-items-center baseline cursor-pointer"
        }
      >
        <div className="flex flex-row mr-auto">
          <div className={"w-24 px-4 my-auto ml-4"}>
            <Logo />
          </div>
          <h1 className="my-auto hidden md:block whitespace-nowrap text-3xl font-extrabold tracking-widest uppercase">
            Dead on Arrival
          </h1>
        </div>

        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="flex ml-auto col-start-3 mr-4 lg:hidden"
        >
          <GiHamburgerMenu className={" w-12 h-12 cursor-pointer my-auto"} />
        </button>
        {/* Push menu into middle column on mobile*/}
        <div className={`lg:hidden`} />
        <div className={``} />
        <motion.div
          layout
          animate={{ opacity: 100 }}
          transition={{ duration: 0.05, type: "spring", stiffness: 100 }}
          className={
            "w-full pb-4 mt-8 col-span-2 lg:col-span-1 mr-32 " + menuClasses
          }
          layoutId="menu"
        >
          <ul
            className={
              "text-4xl lg:text-lg ml-16 lg:ml-0 mt-2  justify-between h-full pb-4 uppercase text-md grid grid-flow-row lg:grid-flow-col bold  mx-auto "
            }
          >
            <MenuItem>
              <a href="/magazine">Magazine</a>
            </MenuItem>
            <MenuItem>
              <a href="/articles">Articles</a>
            </MenuItem>
            <MenuItem>
              <a href="/blog">Blog</a>
            </MenuItem>
            <MenuItem>
              <a href="/shop">Shop</a>
            </MenuItem>
            <MenuItem>
              <a href="/about">About</a>
            </MenuItem>
            <MenuItem>
              <a href="/contact">Contact</a>
            </MenuItem>
            <MenuItem>
              <a href="/subscribe">Subscribe</a>
            </MenuItem>
            <MenuItem>
              <span className="text-red-400">
                <a href="/cart">Cart</a>
              </span>
            </MenuItem>
          </ul>
        </motion.div>
      </Wrapper>
    </AnimateSharedLayout>
  );
};

Navigation.propTypes = {
  siteTitle: PropTypes.string,
};

Navigation.defaultProps = {
  siteTitle: ``,
};

export default Navigation;
