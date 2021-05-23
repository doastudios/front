/** @jsx jsx */
import React, { FormEventHandler, ReactElement, useState } from "react";

import { motion } from "framer-motion";
import useScrollPosition from "../cross/hooks/useScrollPosition";
import { usePageVisibility } from "react-page-visibility";
import Layout from "../layouts/index";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Popup from "../components/Popup";
import Ticker from "react-ticker";
import { validateEmail } from "../util";
import { FormWithToasts } from "../components/FormWithToasts";

interface Props {}

const DoaComputer = require("../images/DoaComputer.png");
const DoaCartonBordered = require("../images/DoaCartonBordered.png");

const MyTicker = ({
  direction,
  className,
}: {
  direction: "toLeft" | "toRight";
  className?: string;
}) => {
  const isVisible = usePageVisibility();

  return (
    <div className={`h-8 ${className}`}>
      {isVisible && (
        <Ticker
          direction={direction}
          speed={3}
          move={true}
          offset={direction === "toRight" ? "100%" : undefined}
        >
          {(index) => (
            <h1
              className="text-xl font-bold text-white md:text-3xl whitespace-nowrap bg-cyan"
              css={css`
                width: 150rem;
              `}
            >
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE
              <span className="opacity-0 no-select">DOA</span>
              <span className="text-loud-yellow">
                <span className="opacity-0 no-select">DOA</span> TED CRUZ IS THE
                ZODIAC KILLER
              </span>
            </h1>
          )}
        </Ticker>
      )}
    </div>
  );
};

function Index(_props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const scrollPosition = useScrollPosition();

  const StarfieldContainer = styled.div`
    margin-top: -100%;
  `;

  const [email, setEmail] = useState("");
  const submitEmail = (e: any) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const onSubmit = (e: any, addToast: Function) => {
    e.preventDefault();
    let myForm = document.getElementById("newsletter-form");

    const formData = new FormData(myForm as any);

    if (!myForm || !validateEmail((formData as any).get("email"))) return false;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "newsletter-form",
        email,
      }),
    })
      .then(() => addToast("bird up", { appearance: "success" }))
      .catch((error) => addToast(error.message, { appearance: "error" }));
  };

  return (
    <Layout hideNav hideFooter>
      <div
        className=" bg-cyan full-bleed grid h-screen"
        css={css`
          grid-template-rows: 2fr 3fr;
        `}
      >
        <div className={"flex flex-col"}>
          <MyTicker
            direction="toLeft"
            className="mb-auto md:my-auto  md:mt-4"
          />
          <img
            className="mx-auto my-auto  w-1/2 md:w-1/5 py-4"
            src={DoaComputer}
          />
          <MyTicker
            direction="toRight"
            className="mt-auto md:my-auto md:mb-4"
          />
        </div>
        <div className=" px-8 md:pr-12 py-8 pt-16 font-extrabold text-white bg-black ">
          <div className="grid grid-flow-row md:grid-flow-col w-full h-full justify-items-end">
            <div className="flex flex-col my-auto px-4 lg:px-0 lg:text-xl text-bold text-center lg:w-1/2 md:mr-2">
              <p>
                Be the first to receive can’t-miss offers and discounts, updates
                on our magazine launch, plus get access to the most exclusive
                DOA content by signing up for our newsletter.
              </p>
              <div className="my-8 md:my-0">
                <FormWithToasts id="newsletter-form" onSubmit={onSubmit}>
                  <>
                    <div className="flex flex-row md:flex-row w-full px-8 my-12">
                      <button
                        type="submit"
                        className="z-10 px-8 py-3 md:text-lg font-semibold uppercase bg-cyan rounded-md"
                      >
                        EMAIL
                      </button>
                      <input
                        className="w-full pl-6 -ml-4 text-black rounded-r-md focus:outline-none"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                </FormWithToasts>
              </div>
            </div>
            <div className="w-full md:mr-auto flex flex-row lg:flex-row md:col-start-1 pb-8 justify-center">
              <img
                src={DoaCartonBordered}
                className="w-32 md:w-48 lg:w-64 my-auto invert"
              />
              <h1 className="uppercase py-4 my-auto text-2xl sm:text-4xl text-center xl:text-6xl">
                Dead on <br /> Arrival
              </h1>
            </div>
          </div>
          <div className="text-sm text-center col-span-2">
            <a href="/pp">Privacy Policy</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
