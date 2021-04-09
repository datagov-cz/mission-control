import React, { useCallback } from "react";
import { Link, LinkProps } from "@material-ui/core";

import { useRouter } from "react-router5";
import { RouteName } from "@types";

type RouteLinkProps = Omit<LinkProps, "component" | "href"> & {
  route: RouteName;
  params?: Record<string, any>;
};

const RouteLink: React.FC<RouteLinkProps> = ({
  route,
  params = {},
  target,
  onClick = () => null,
  ...rest
}) => {
  const router = useRouter();
  const href = router.buildUrl(route, params);
  const navigate = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

      if (evt.button === 0 && !comboKey && target !== "_blank") {
        evt.preventDefault();
        onClick(evt);
        router.navigate(route, params);
      }
    },
    [router, route, params, target, onClick]
  );

  return <Link {...rest} href={href} target={target} onClick={navigate} />;
};

export default RouteLink;
