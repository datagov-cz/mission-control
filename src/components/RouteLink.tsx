import React, { useCallback, useTransition } from "react";
import { generatePath } from "react-router-dom";
import { Link, LinkProps } from "@mui/material";

import useGoTo from "hooks/useGoTo";

type RouteLinkProps = Omit<LinkProps, "component" | "href"> & {
  route: string;
  params?: Record<string, any>;
};

const RouteLink: React.FC<RouteLinkProps> = ({
  route,
  params = {},
  target,
  onClick = () => null,
  ...rest
}) => {
  const [, startTransition] = useTransition();
  const goTo = useGoTo();
  const href = generatePath(route, params);
  const go = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

      if (evt.button === 0 && !comboKey && target !== "_blank") {
        evt.preventDefault();
        onClick(evt);
        startTransition(() => {
          goTo(route, params);
        });
      }
    },
    [startTransition, goTo, route, params, target, onClick]
  );

  return <Link {...rest} href={href} target={target} onClick={go} />;
};

export default RouteLink;
