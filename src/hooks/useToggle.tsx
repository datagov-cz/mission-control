import { useState, useCallback } from "react";

const useToggle = () => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return {
    isOpen,
    open,
    close,
  };
};

export default useToggle;
