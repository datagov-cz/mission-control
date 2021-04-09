import React, { ComponentType } from "react";
import useRoute from "hooks/useRoute";

const RouteComponentRendererContext = React.createContext(0);

const renderComponent = (Component: ComponentType) => {
  return Component ? <Component /> : null;
};

const RouteComponentRenderer: React.FC = () => {
  const { components } = useRoute();
  return (
    <RouteComponentRendererContext.Consumer>
      {(level) => (
        <RouteComponentRendererContext.Provider value={level + 1}>
          {renderComponent(components[level])}
        </RouteComponentRendererContext.Provider>
      )}
    </RouteComponentRendererContext.Consumer>
  );
};

export default RouteComponentRenderer;
