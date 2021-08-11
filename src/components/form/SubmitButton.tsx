import React, { useCallback, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "@material-ui/core";

type SubmitButtonProps = Omit<ButtonProps, "onClick"> & {
  onClick: (data: any) => void;
  pending?: React.ReactNode;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  pending,
  children,
  ...rest
}) => {
  const { handleSubmit } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const combinedOnSubmit = useCallback(() => {
    handleSubmit((data) => {
      startTransition(() => {
        onClick(data);
      });
    })();
  }, [onClick, handleSubmit, startTransition]);

  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      size="large"
      onClick={combinedOnSubmit}
      disabled={isPending}
      children={isPending && pending ? pending : children}
      {...rest}
    />
  );
};

export default SubmitButton;
