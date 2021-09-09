import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import {
  RegisterOptions,
  useFormContext,
  useController,
} from "react-hook-form";

import t from "components/i18n";

type TextFieldProps = MuiTextFieldProps & {
  name: string;
  rules: RegisterOptions;
};

const TextField: React.FC<TextFieldProps> = ({
  name,
  rules,
  defaultValue = "",
  ...restProps
}) => {
  const { control } = useFormContext();
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <MuiTextField
      {...inputProps}
      {...restProps}
      inputRef={ref}
      error={!!error}
      helperText={error?.message ? t(error?.message) : undefined}
    />
  );
};

export default TextField;
