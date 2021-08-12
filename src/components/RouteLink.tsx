import React, { useCallback } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Link, LinkProps } from "@material-ui/core";

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
  const navigate = useNavigate();
  const href = generatePath(route, params);
  const go = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

      if (evt.button === 0 && !comboKey && target !== "_blank") {
        evt.preventDefault();
        onClick(evt);
        navigate(href);
      }
    },
    [navigate, href, target, onClick]
  );

  return <Link {...rest} href={href} target={target} onClick={go} />;
};

export default RouteLink;
