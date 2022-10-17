import React from "react";
import NavigationTab from "./components/NavigationTab";
import t from "./components/i18n";
import { Locale } from "./@types";

interface Props {
  children: React.ReactNode;
  setLanguage: (language: Locale) => void;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{t`controlPanel`}</h1>
      <button onClick={()=>props.setLanguage("en")}>English</button>
      <button onClick={()=>props.setLanguage("cs")}>Čeština</button>
      <NavigationTab />
      <hr />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above.
          For now it is removed
          TODO: Return outlet
          */}

      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
