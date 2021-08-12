import { useCallback } from "react";
import { useNavigate, generatePath, Params } from "react-router";

const useGoTo = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
    (path: string, params?: Params) => {
      const pathname = generatePath(path, params);
      navigate(pathname);
    },
    [navigate]
  );

  return goTo;
};

export default useGoTo;
