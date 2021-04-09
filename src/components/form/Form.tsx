import React, { ReactNode } from "react";
import { useForm, FormProvider, UseFormMethods } from "react-hook-form";

export type FormDialogProps = {
  form?: UseFormMethods<Record<string, any>>;
  children: ReactNode;
};

const Form: React.FC<FormDialogProps> = ({ form, children }) => {
  const localForm = useForm();

  const selectedForm = form ? form : localForm;

  return <FormProvider {...selectedForm}>{children}</FormProvider>;
};

export default Form;
