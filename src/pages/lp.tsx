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
  const isVisible = usePageVisibility();

  console.log(isVisible);
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
            <h1 className="text-xl font-bold text-white md:text-3xl whitespace-nowrap bg-cyan">
              <span className="opacity-0 no-select">DOA</span>
              DOA MAGAZINE <span className="opacity-0 no-select">DOA</span> DOA
              MAGAZINE{" "}
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
      .then(() => addToast("bird up", { appearance: "success" }))
      .catch((error) => addToast(error.message, { appearance: "error" }));
  };

  return (
    <Layout hideNav>
      <div
        className="h-screen bg-cyan full-bleed grid"
        css={css`
          grid-template-rows: 2fr 3fr;
        `}
      ></div>
    </Layout>
  );
}

export default Index;
