import React, { FormEventHandler, ReactElement, useState } from "react";
import { motion } from "framer-motion";
import useScrollPosition from "../cross/hooks/useScrollPosition";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Popup from "../components/Popup";
import { MultiTicker } from "../components/Ticker";
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
  return (
    <div
      className={`h-12 text-white text-3xl overflow-hidden ${className || ""}`}
    >
      <Ticker
        speed={2}
        mode={"chain"}
        direction={direction}
        offset={direction === "toRight" ? "100%" : undefined}
      >
        {() => <h1 className="px-1 h-12 overflow-hidden"> DOA MAGAZINE </h1>}
      </Ticker>
    </div>
  );
};

const FormWithToasts = ({
  id,
  children,
}: {
  id: string;
  children: ReactElement;
}) => {
  const { addToast } = useToasts();

  const onSubmit = (e: any) => {
    e.preventDefault();
    let myForm = document.getElementById("newsletter-form");
    console.log(myForm);
    console.log(id);
    let formData = new FormData(myForm as HTMLFormElement);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() =>
        addToast("Thanks for subscribing!", { appearance: "success" })
      )
      .catch((error) => addToast(error.message, { appearance: "error" }));
  };

  return (
    <form id={id} onSubmit={onSubmit as any}>
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
  const submitEmail = (e) => {
    console.log(e);
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <ToastProvider>
        <div className=" bg-cyan full-bleed grid grid-flow-row md:grid-rows-5 h-screen">
          <div className="md:row-span-5">
            <div className="w-full h-full mt-3 flex flex-col flex-grow justify-between ">
              <div className="mt-1">
                <MyTicker direction="toLeft" />
              </div>
              <div className="py-8 row-span-3">
                <h1 className="pr-16 text-5xl italic font-semibold tracking-widest text-right uppercase"></h1>
                <div className="w-64 mx-auto">
                  <img className="mx-auto" src={DoaComputer} />
                </div>
              </div>
              <MyTicker direction="toRight" className="mb-4" />
            </div>
          </div>
          <div className=" px-4 py-8 pt-16 mt-auto font-extrabold text-white bg-black full-bleed md:px-28 md:row-span-2 ">
            <div className="flex flex-col md:flex-row-reverse  w-full h-full ">
              <div className="flex md:my-auto flex-col text-center md:flex-reverse md:w-1/3">
                <p>
                  Be the first to receive can’t-miss offers and discounts,
                  updates on our magazine launch, plus get access to the most
                  exclusive DOA content by signing up for our newsletter.
                </p>
                <div className="my-8 md:my-0">
                  <FormWithToasts id="newsletter-form">
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
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </>
                  </FormWithToasts>
                </div>
              </div>
              <div className="md:w-1/3 md:mr-auto flex flex-row px-8">
                <img
                  src={DoaCartonBordered}
                  className="w-32 md:w-64 mx-auto my-auto invert"
                />
                <h1 className="uppercase py-4 md:my-auto text-4xl text-center">
                  Dead on Arrival
                </h1>
              </div>
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
      </ToastProvider>
    </>
  );
}

export default Index;
