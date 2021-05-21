import React, { useState, useCallback, useEffect, useRef } from "react";
import Layout from "../layouts";

const PP = () => {
  const iframe = React.useRef<HTMLDivElement>();
  const container = React.useRef<HTMLDivElement>();
  const onLoad = ({ target }: { target: any }) => {
    [target].forEach((each) => {
      console.log(target.readyState);
      // each.style.height = window.getComputedStyle( TODO fix this shit
      //   target.contentWindow.document.body.querySelector("div")
      // ).height;

      each.style.height = "14600px";
    });
  };

  useEffect(() => {
    const node = iframe.current;

    if (node) {
      node.addEventListener("load", onLoad);
    }
  });

  return (
    <Layout>
      <div
        id="iframe-container"
        ref={container as any}
        className="w-full min-h-screen mt-32 mb-32 px-32"
      >
        <h1 className="text-4xl text-center mb-8 font-black">DOA</h1>
        <iframe
          ref={iframe as any}
          src={"/privacy_policy.html"}
          className="w-full h-full"
        ></iframe>
      </div>
    </Layout>
  );
};

export default PP;
