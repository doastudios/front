import React, { useState, useCallback } from "react";
import Layout from "../layouts";

const PP = () => {
  return (
    <Layout>
      <div className="w-full h-screen">
        <iframe src={"/pp.html"} className="w-full h-full"></iframe>
      </div>
    </Layout>
  );
};

export default PP;
