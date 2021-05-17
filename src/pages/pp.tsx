import React, { useState, useCallback } from "react";
import Layout from "../layouts";

const PP = () => {
  return (
    <Layout>
      <div className="w-full h-screen">
        <iframe src={"/privacy_policy.html"} className="w-full h-full"></iframe>
      </div>
    </Layout>
  );
};

export default PP;
