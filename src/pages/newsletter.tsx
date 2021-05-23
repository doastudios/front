/** @jsx jsx */
import React, { FormEventHandler, ReactElement, useState } from "react";

import { motion, motionValue, useTransform } from "framer-motion";
import useScrollPosition from "../cross/hooks/useScrollPosition";
import { usePageVisibility } from "react-page-visibility";
import Layout from "../layouts/index";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Popup from "../components/Popup";
import Ticker from "react-ticker";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { validateEmail } from "../util";
import { FadeInWhenVisible } from "../components/FadeInWhenVisible";

interface Props {}

const DoaHasClass = require("../images/DoaHasClass.webp");

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
  const isVisible = usePageVisibility();

  return (
    <Layout>
      <div className="full-bleed has-scrollbar">
        <div className="grid grid-flow-row md:grid-cols-2 w-full h-full justify-items-end bg-loud-yellow">
          <div className="px-8 py-12 lg:px-24 lg:py-32 row-start-2 md:row-start-1">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold ">
              DOA MAGAZINE
              <br /> KICKS ASS.
            </h1>
            <p className="lg:text-2xl pt-6 md:pt-12 tracking-widest font-normal leading-loose">
              Be the first to receive can’t-miss offers and discounts, updates
              on our magazine launch, plus get access to the most exclusive DOA
              content by signing up for our newsletter.
            </p>
            <FormWithToasts id="newsletter-form" onSubmit={onSubmit}>
              <>
                <div className="flex flex-col w-full my-12">
                  <input
                    className="font-ocrastd text-xl w-full py-2 pl-2 text-black placeholder-black rounded-md bg-white bg-opacity-60 focus:bg-white border-2 border-black mb-4"
                    value={email}
                    name="email"
                    placeholder={"Enter your email <3"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="font-ocrastd text-xl px-2 py-2 text-right w-full pl-6 text-black rounded-md bg-transparent focus:bg-white border-2 border-black"
                  >
                    Submit
                  </button>
                </div>
              </>
            </FormWithToasts>
          </div>
          <div className="flex flex-row h-screen/2 md:h-full">
            <div className="marquee bg-black text-white w-8 hidden md:block">
              <div className="marqueeone">
                DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE
              </div>
              <div className="marqueetwo">
                DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE{" "}
              </div>
              <div className="marqueethree">
                DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE{" "}
              </div>
              <div className="marqueefour">
                DOA MAGAZINE DOA MAGAZINE DOA MAGAZINE{" "}
              </div>
            </div>
            <FadeInWhenVisible>
              <img src={DoaHasClass} className="object-cover h-full w-full" />
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
