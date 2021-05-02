import React, { FormEventHandler, ReactElement, useState } from "react";
import { motion } from "framer-motion";
import PageVisibility from "react-page-visibility";
import useScrollPosition from "../cross/hooks/useScrollPosition";
import Layout from "../layouts/index";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Popup from "../components/Popup";
import Ticker from "react-ticker";
import { ToastProvider, useToasts } from "react-toast-notifications";

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
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };
  return (
    <div className={`h-8 ${className}`}>
      <PageVisibility>
        {pageIsVisible && (
          <Ticker
            direction={direction}
            speed={10}
            offset={direction === "toRight" ? "100%" : undefined}
          >
            {(index) => (
              <h1 className="ml-6 text-white text-lg md:text-3xl whitespace-nowrap text-bold">
                DOA MAGAZINE{" "}
                <span className="ml-6 text-loud-yellow">
                  TED CRUZ IS THE ZODIAC KILLER{" "}
                </span>
              </h1>
            )}
          </Ticker>
        )}
      </PageVisibility>
    </div>
  );
};

const FormWithToasts = ({
  id,
  children,
  onSubmit,
}: {
  id: string;
  children: ReactElement;
  onSubmit: Function;
}) => {
  const { addToast } = useToasts();
  return (
    <form
      id={id}
      name={"newsletter-form"}
      onSubmit={(e) => {
        onSubmit(e, addToast);
      }}
      data-netlify={true}
    >
      {{ ...children }}
    </form>
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
    console.log(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "newsletter-form",
        email,
      }),
    })
      .then(() =>
        addToast("Thanks for subscribing!", { appearance: "success" })
      )
      .catch((error) => addToast(error.message, { appearance: "error" }));
  };

  return (
    <Layout hideNav>
      <div className=" bg-cyan full-bleed grid h-screen">
        <div className="md:row-span-5 flex flex-col overflow-hidden">
          <MyTicker direction="toLeft" className="my-auto  md:mt-4" />
          <img className="mx-auto my-auto  w-1/5 py-4" src={DoaComputer} />
          <MyTicker direction="toRight" className="my-auto md:mb-4" />
        </div>
        <div className=" px-8 pr-12 py-8 pt-16 font-extrabold text-white bg-black ">
          <div className="flex flex-col md:flex-row-reverse w-full h-full">
            <div className="flex md:my-auto flex-col text-xl text-center md:flex-reverse md:w-1/3 ">
              <p>
                Be the first to receive can’t-miss offers and discounts, updates
                on our magazine launch, plus get access to the most exclusive
                DOA content by signing up for our newsletter.
              </p>
              <div className="my-8 md:my-0">
                <FormWithToasts id="newsletter-form" onSubmit={onSubmit}>
                  <>
                    <div className="flex flex-row w-full px-8 mt-6">
                      <button
                        type="submit"
                        className="z-10 px-8 py-3 font-semibold uppercase bg-cyan rounded-md"
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
            <div className="md:w-1/3 md:mr-auto flex flex-row ">
              <img
                src={DoaCartonBordered}
                className="w-32 md:w-64 my-auto invert"
              />
              <h1 className="uppercase py-4 md:my-auto text-4xl text-center">
                Dead on Arrival
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
