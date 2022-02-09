import React, { useEffect } from "react";
import { useFormContext, useController } from "react-hook-form";

type HiddenProps = {
  name: string;
  value: string;
};

const Hidden: React.FC<HiddenProps> = ({ name, value, ...restProps }) => {
  const { control, setValue } = useFormContext();
  const {
    field: { ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: value,
  });

  useEffect(() => setValue(name, value), [setValue, name, value]);

  return <input type="hidden" {...inputProps} {...restProps} />;
};

export default Hidden;
