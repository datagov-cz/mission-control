import { useCallback } from "react";
import { useNavigate, generatePath, Params } from "react-router";

import Routes from "app/routes";

type RoutesConfigType = Record<
  string,
  string & { onEnter?: (params?: Params) => void }
>;

const RoutesConfig = Routes as unknown as RoutesConfigType;

const RoutesMap = Object.keys(Routes).reduce((acc, key) => {
  acc[RoutesConfig[key]] = RoutesConfig[key];
  return acc;
}, {} as RoutesConfigType);

const useGoTo = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
    (path: string, params?: Params) => {
      if (RoutesMap[path]?.onEnter) {
        RoutesMap[path].onEnter!(params);
      }

      const pathname = generatePath(path, params);
      navigate(pathname);
    },
    [navigate]
  );

  return goTo;
};

export default useGoTo;
