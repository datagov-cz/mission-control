import React from "react";
import { useFormContext, useController } from "react-hook-form";

type HiddenProps = {
  name: string;
  value: string;
};

const Hidden: React.FC<HiddenProps> = ({ name, value, ...restProps }) => {
  const { control } = useFormContext();
  const {
    field: { ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: value,
  });

  return <input type="hidden" {...inputProps} {...restProps} />;
};

export default Hidden;
