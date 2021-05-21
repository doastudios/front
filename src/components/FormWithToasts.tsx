import React, { FormEventHandler, ReactElement, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

export const FormWithToasts = ({
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
