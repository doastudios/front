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

  return (
    <Layout>
      <div className="full-bleed grid grid-cols-2 w-full h-full justify-items-end bg-loud-yellow">
        <div className="px-24 py-32">
          <h1 className="text-7xl pb-12 font-bold">
            DOA MAGAZINE
            <br /> KICKS ASS.
          </h1>
          <p className="text-2xl tracking-widest font-normal leading-relaxed">
            Be the first to receive can’t-miss offers and discounts, updates on
            our magazine launch, plus get access to the most exclusive DOA
            content by signing up for our newsletter.
          </p>

          <FormWithToasts id="newsletter-form" onSubmit={onSubmit}>
            <>
              <div className="flex flex-col w-full my-12">
                <input
                  className="text-xl w-full py-2 pl-2 text-black placeholder-black rounded-md bg-white bg-opacity-60 focus:bg-white border-2 border-black mb-4"
                  value={email}
                  name="email"
                  placeholder={"Enter your email <3"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-xl px-2 py-2 text-right w-full pl-6 text-black rounded-md bg-transparent focus:bg-white border-2 border-black"
                >
                  Submit
                </button>
              </div>
            </>
          </FormWithToasts>
        </div>
        <div>
          <FadeInWhenVisible>
            <img src={DoaHasClass} />
          </FadeInWhenVisible>
        </div>
      </div>
      <div className="text-sm text-center col-span-2">
        <a href="/pp">Privacy Policy</a>
      </div>
    </Layout>
  );
}

export default Index;
